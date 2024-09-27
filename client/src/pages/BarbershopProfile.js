import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, NavLink, useNavigate } from 'react-router-dom'; // Importez useNavigate pour la redirection
import './BarbershopProfile.css';
import StarRating from '../components/StarRating';

const BarbershopProfile = () => {
  const { id } = useParams(); // Récupérer l'ID du barbershop depuis l'URL
  const [barbershop, setBarbershop] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  const navigate = useNavigate(); // Initialisez useNavigate pour la navigation

  useEffect(() => {
    fetchBarbershop();
    fetchAverageRating();
  }, []);

  const fetchBarbershop = async () => {
    try {
      const response = await axios.get(`/api/barbershops/getBar/${id}`);
      setBarbershop(response.data);
    } catch (error) {
      console.error('Error fetching barbershop:', error);
    }
  };

  const fetchAverageRating = async () => {
    try {
      const response = await axios.get(`/api/ratings/average/${id}`);
      setAverageRating(response.data.averageRating);
    } catch (error) {
      console.error('Error fetching average rating:', error);
    }
  };

  const handleAddRating = () => {
    navigate(`/ratings/${id}`); // Rediriger vers la page d'ajout de rating avec l'ID du barbershop
  };

  if (!barbershop) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="barbershop-profile">
      <div className="barbershop-nav">
      <NavLink to={`/client`} activeClassName="active-link">Acceuil</NavLink>
        <NavLink to={`/profile/${id}`} activeClassName="active-link">Profile</NavLink>
        <NavLink to={`/clientportfoglio/${id}`} activeClassName="active-link">Portfolios</NavLink>
        <NavLink to={`/ratings/${id}`} activeClassName="active-link">Ratings</NavLink>
        <NavLink to={`/Breservations/${id}`} activeClassName="active-link">Reservations</NavLink>
        <NavLink to={`/Cservices/${id}`} activeClassName="active-link">Services</NavLink>

      </div>
      
      <div className="barbershop-header">
        <img src={`/${barbershop.image}`} alt={barbershop.name} className="barbershop-image" />
        <h1 className="barbershop-name">{barbershop.name}</h1>
        <p className="barbershop-address">
          <span className="label">Address: </span> {barbershop.address}
        </p>
        <p className="barbershop-phone">
          <span className="label">Phone: </span> {barbershop.phone}
        </p>
        {averageRating && (
          <>
            <h1 className="barbershop-rating">Average Rating:</h1>
            <StarRating rating={Math.round(averageRating)} /> {/* Affichage des étoiles */}
          </>
        )}
        <button onClick={handleAddRating} className="add-rating-button">Add Rating</button>
      </div>

      <div className="barbershop-details">
        <h2>About Us</h2>
        <p className="barbershop-description">{barbershop.description}</p>
      </div>
    </div>
  );
};

export default BarbershopProfile;
