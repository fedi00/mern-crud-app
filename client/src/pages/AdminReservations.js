import React, { useEffect, useState } from 'react';
import { getBarbershopReservations, updateReservationStatus } from '../services/api';
import moment from 'moment';
import './AdminReservations.css';
import { useParams, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await getBarbershopReservations(id);
        const data = response;

        if (!data) {
          throw new Error('Les données sont undefined');
        }

        const sortedReservations = data.sort((a, b) => new Date(a.reservationTime) - new Date(b.reservationTime));
        setReservations(sortedReservations);
        setFilteredReservations(sortedReservations);
      } catch (error) {
        console.error('Erreur lors de la récupération des réservations', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [id]);

  useEffect(() => {
    let filtered = reservations;

    if (filterStatus) {
      filtered = filtered.filter(r => r.status === filterStatus);
    }

    if (filterDate) {
      filtered = filtered.filter(r =>
        moment(r.reservationTime).format('YYYY-MM-DD') === filterDate
      );
    }

    setFilteredReservations(filtered);
  }, [filterStatus, filterDate, reservations]);

  const handleUpdateStatus = async (reservationId, status) => {
    try {
      await updateReservationStatus(reservationId, status);
      const response = await getBarbershopReservations(id);
      setReservations(response);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de la réservation', error);
    }
  };

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  if (loading) {
    return <p className="loading">Chargement des réservations...</p>;
  }

  return (
    <div className="reservations-page">
          <div className="barbershop-nav">
          <NavLink to={`/admin`} activeClassName="active-link">Acceuil</NavLink>
        <NavLink to={`/barbershopDetails/${id}`} activeClassName="active-link">Details</NavLink>
        <NavLink to={`/portfolios/${id}`} activeClassName="active-link">Portfolios</NavLink>
        <NavLink to={`/getratings/${id}`} activeClassName="active-link">Ratings</NavLink>
        <NavLink to={`/reservations/${id}`} activeClassName="active-link">Reservations</NavLink>
        <NavLink to={`/Aservices/${id}`} activeClassName="active-link">Services</NavLink>

      </div>
      <h2>Réservations pour le barbershop</h2>

      {/* Filtre de statut */}
      <div className="status-filter">
        <label htmlFor="status">Filtrer par statut :</label>
        <select id="status" value={filterStatus} onChange={handleFilterChange}>
          <option value="">Tous</option>
          <option value="Acceptée">Accepté</option>
          <option value="Supprimée">Supprimé</option>
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
              <th>Client</th>
              <th>Date</th>
              <th>Heure</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((reservation) => (
              <tr key={reservation._id}>
                <td>{reservation.user.name}</td>
                <td>{moment(reservation.reservationTime).format('LL')}</td>
                <td>{moment(reservation.reservationTime).format('LT')}</td>
                <td>{reservation.status}</td>
                <td>
                  <button
                    onClick={() => handleUpdateStatus(reservation._id, 'Acceptée')}
                    className="status-button accept"
                  >
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(reservation._id, 'Supprimée')}
                    className="status-button reject"
                  >
                    <FontAwesomeIcon icon={faTimesCircle} />
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

export default AdminReservations;
