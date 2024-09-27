import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filteredReservations, setFilteredReservations] = useState([]);

  useEffect(() => {
    // Récupérer les réservations de l'utilisateur connecté
    const fetchReservations = async () => {
      try {
        const response = await axios.get('/api/reservations/user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Assurez-vous d'avoir le token JWT stocké
          }
        });
        setReservations(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des réservations:', error);
      }
    };

    fetchReservations();
  }, []);

  useEffect(() => {
    // Filtrer les réservations en fonction du statut et de la date
    let filtered = reservations;

    if (filterStatus) {
      filtered = filtered.filter(reservation => reservation.status === filterStatus);
    }

    if (filterDate) {
      filtered = filtered.filter(reservation =>
        moment(reservation.reservationTime).isSame(moment(filterDate), 'day')
      );
    }

    setFilteredReservations(filtered);
  }, [filterStatus, filterDate, reservations]);

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  // Fonction pour supprimer une réservation
  const deleteReservation = async (reservationId) => {
    try {
      await axios.delete(`/api/reservations/Dreservations/${reservationId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      // Mettre à jour l'état local après suppression
      setReservations(reservations.filter(reservation => reservation._id !== reservationId));
    } catch (error) {
      console.error('Erreur lors de la suppression de la réservation:', error);
    }
  };

  return (
    <div className="reservations-page">
      <h2>Mes Réservations</h2>

      {/* Filtre de statut */}
      <div className="status-filter">
        <label htmlFor="status">Filtrer par statut :</label>
        <select id="status" value={filterStatus} onChange={handleFilterChange}>
          <option value="">Tous</option>
          <option value="Acceptée">Acceptée</option>
          <option value="Supprimée">Supprimée</option>
          <option value="Non traitée">En cours</option>
        </select>
      </div>

      {/* Filtre de date */}
      <div className="date-filter">
        <label htmlFor="filterDate">Filtrer par date :</label>
        <input
          type="date"
          id="filterDate"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>

      {filteredReservations.length === 0 ? (
        <p className="no-reservations">Aucune réservation disponible.</p>
      ) : (
        <table className="reservations-table">
          <thead>
            <tr>
              <th>Barbershop</th>
              <th>Date</th>
              <th>Heure</th>
              <th>Statut</th>
              <th>Actions</th> {/* Nouvelle colonne pour le bouton de suppression */}
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((reservation) => (
              <tr key={reservation._id}>
                <td>{reservation.barbershop.name}</td>
                <td>{moment(reservation.reservationTime).format('LL')}</td>
                <td>{moment(reservation.reservationTime).format('LT')}</td>
                <td>{reservation.status}</td>
                <td>
                  {/* Bouton de suppression sous forme de croix rouge */}
                  <button class="delete-button"
                    onClick={() => deleteReservation(reservation._id)}
                    
                  >
                    &#10006;
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReservationsPage;
