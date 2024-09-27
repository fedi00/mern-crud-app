import React, { useState } from 'react';
import RatingStars from 'react-rating-stars-component';
import { addRating } from '../services/api';
import { useParams, NavLink, useNavigate } from 'react-router-dom'; // Importez useNavigate pour la redirection
import './AddRating.css';

const AddRating = () => {
  const { id } = useParams();  // Récupère l'ID du barbershop depuis l'URL
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();  // Initialise le hook de navigation

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const submitRating = async () => {
    try {
      await addRating(id, rating);  // Utilise l'ID récupéré
      setMessage('Votre note a été ajoutée avec succès !');
      
      // Redirige vers le profil du barbershop après la soumission réussie
      navigate(`/profile/${id}`);
    } catch (error) {
      setMessage("Une erreur s'est produite lors de l'ajout de votre note.");
    }
  };

  return (
    <div className="rating-container" style={{ textAlign: 'center', marginTop: '50px' }}>
        <div className="barbershop-nav">
        <NavLink to={`/client`} activeClassName="active-link">Acceuil</NavLink>
        <NavLink to={`/profile/${id}`} activeClassName="active-link">Profile</NavLink>
        <NavLink to={`/clientportfoglio/${id}`} activeClassName="active-link">Portfolios</NavLink>
        <NavLink to={`/ratings/${id}`} activeClassName="active-link">Ratings</NavLink>
        <NavLink to={`/Breservations/${id}`} activeClassName="active-link">Reservations</NavLink>
        <NavLink to={`/Cservices/${id}`} activeClassName="active-link">Services</NavLink>

      </div>
      <h2>Donnez votre avis</h2>
      <RatingStars
        count={5}
        onChange={handleRatingChange}
        size={50}
        activeColor="#ffd700"
        value={rating}
      />
      <button onClick={submitRating} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
        Soumettre
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddRating;
