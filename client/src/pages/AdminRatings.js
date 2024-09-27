// src/pages/AdminRatings.js
import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { getRatingsByBarbershopId } from '../services/api';
import StarRating from '../components/StarRating';
import './AdminRatings.css';

const AdminRatings = () => {
  const [ratings, setRatings] = useState([]);
  const { id } = useParams(); // Utilisez 'id' au lieu de 'barbershopId'

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        if (id) {
          const data = await getRatingsByBarbershopId(id);
          setRatings(data);
        } else {
          console.error('Barbershop ID est manquant dans l\'URL.');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des évaluations:', error);
      }
    };

    fetchRatings();
  }, [id]);

  // Fonction pour calculer la moyenne des évaluations
  const calculateAverageRating = () => {
    if (ratings.length === 0) return 0;
    const total = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    return (total / ratings.length).toFixed(1); // Arrondir à 1 décimale
  };

  return (
    <div className="admin-ratings-page">
          <div className="barbershop-nav">
          <NavLink to={`/admin`} activeClassName="active-link">Acceuil</NavLink>
        <NavLink to={`/barbershopDetails/${id}`} activeClassName="active-link">Details</NavLink>
        <NavLink to={`/portfolios/${id}`} activeClassName="active-link">Portfolios</NavLink>
        <NavLink to={`/getratings/${id}`} activeClassName="active-link">Ratings</NavLink>
        <NavLink to={`/reservations/${id}`} activeClassName="active-link">Reservations</NavLink>
        <NavLink to={`/Aservices/${id}`} activeClassName="active-link">Services</NavLink>

      </div>
      <h1>Évaluations du Barbershop</h1>
      <div className="average-rating">
        <h2>Moyenne des Évaluations</h2>
        <div className="average-rating-stars">
          <StarRating rating={calculateAverageRating()} />
          <span className="average-rating-value">
            {calculateAverageRating()}
          </span>
        </div>
      </div>
      <div className="ratings-list">
        <h2>Liste des Évaluations :</h2>
        <div className="ratings-table-container">
          <table className="ratings-table">
            <thead>
              <tr>
                <th>Utilisateur</th>
                <th>Évaluation</th>
              </tr>
            </thead>
            <tbody>
              {ratings.map((rating) => (
                <tr key={rating._id}>
                  <td>{rating.userId.name}</td>
                  <td><StarRating rating={rating.rating} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminRatings;
