import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { useParams, NavLink } from 'react-router-dom'; 
import './Reservation.css';

const Reservation = () => {
  const { id } = useParams();
  const [date, setDate] = useState(new Date());
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState(null);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    if (id) {
      // Fetch available slots
      axios.get(`/api/reservations/availability/${id}`)
        .then(response => setSlots(response.data))
        .catch(err => setError('Erreur lors de la récupération des créneaux horaires'));

      // Fetch user reservations
      const token = localStorage.getItem('token');
      axios.get('/api/reservations/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        console.log('Reservations:', response.data); // Vérifiez les données reçues
        setReservations(response.data);
      })
      .catch(() => setError('Erreur lors de la récupération des réservations'));
    } else {
      setError('ID du barbershop manquant');
    }
  }, [id]);

  const handleDateChange = newDate => {
    setDate(newDate);
  
    // Formater la date pour l'envoyer à l'API
    const formattedDate = moment(newDate).format('YYYY-MM-DD');
    
    axios.get(`/api/reservations/availability/${id}?date=${formattedDate}`)
      .then(response => setSlots(response.data))
      .catch(() => setError('Erreur lors de la récupération des créneaux horaires'));
  };
  

  const handleTimeClick = (time) => {
    const slot = slots.find(slot => slot.time === time);
    if (slot && slot.available) {
      const token = localStorage.getItem('token');
  
      axios.post('/api/reservations/create', 
        { barbershopId: id, reservationTime: time },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(response => {
        alert('Réservation effectuée avec succès');
        setSlots(prevSlots =>
          prevSlots.map(slot =>
            slot.time === time ? { ...slot, available: false } : slot
          )
        );
  
        // Ajouter la nouvelle réservation à l'état
        setReservations(prevReservations => [
          ...prevReservations,
          response.data // Assurez-vous que la réponse contient la nouvelle réservation
        ]);
      })
      .catch(err => {
        if (err.response && err.response.status === 400) {
          // Afficher un message d'erreur spécifique si la date est dans le passé
          alert(err.response.data.error || 'Erreur lors de la création de la réservation');
        } else {
          alert('Erreur lors de la création de la réservation');
        }
      });
    }
  };
  

  const handleDeleteReservation = (reservationId) => {
    const token = localStorage.getItem('token');

    axios.delete(`/api/reservations/Dreservations/${reservationId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(() => {
      alert('Réservation supprimée avec succès');
      setReservations(prevReservations =>
        prevReservations.filter(reservation => reservation._id !== reservationId)
      );

      // Rafraîchir les créneaux horaires
      axios.get(`/api/reservations/availability/${id}`)
        .then(response => setSlots(response.data))
        .catch(() => setError('Erreur lors de la récupération des créneaux horaires'));
    })
    .catch(() => alert('Erreur lors de la suppression de la réservation'));
  };


  return (
    <div className="reservation-container">
      <div className="barbershop-nav">
      <NavLink to={`/client`} activeClassName="active-link">Acceuil</NavLink>
        <NavLink to={`/profile/${id}`} activeClassName="active-link">Profile</NavLink>
        <NavLink to={`/clientportfoglio/${id}`} activeClassName="active-link">Portfolios</NavLink>
        <NavLink to={`/ratings/${id}`} activeClassName="active-link">Ratings</NavLink>
        <NavLink to={`/Breservations/${id}`} activeClassName="active-link">Reservations</NavLink>
        <NavLink to={`/Cservices/${id}`} activeClassName="active-link">Services</NavLink>

      </div>
      <h1 className="reservation-title">Réservation pour Barbershop</h1>
      <div className="calendar-container">
        <DatePicker
          selected={date}
          onChange={handleDateChange}
          inline
        />
      </div>
      <div className="slots-container">
        {slots.map(slot => (
          <button
            key={slot.time}
            onClick={() => handleTimeClick(slot.time)}
            className={`slot-button ${slot.available ? 'available' : 'unavailable'}`}
            disabled={!slot.available}
          >
            {moment(slot.time).format('HH:mm')}
          </button>
        ))}
      </div>
      <div className="reservations-container">
  <h2 className="reservations-title">Réservations Confirmées</h2>
  {reservations.length > 0 ? (
    <ul className="reservations-list">
      {reservations.map(reservation => (
        <li key={reservation._id} className="reservation-item">
          <div className="reservation-info">
            <span className="reservation-time">
              {moment(reservation.reservationTime).format('YYYY-MM-DD HH:mm')}
            </span>
          </div>
          <button
            onClick={() => handleDeleteReservation(reservation._id)}
            className="delete-button"
          >
            &#x2716; {/* Croix rouge */}
          </button>
        </li>
      ))}
    </ul>
  ) : (
    <p className="no-reservations">Aucune réservation confirmée</p>
  )}
</div>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Reservation;
