import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { getBarbershopById } from '../services/api';
import './BarbershopDetails.css';

const BarbershopDetails = () => {
  const { id } = useParams(); // Récupère l'ID du barbershop depuis l'URL
  const [barbershop, setBarbershop] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBarbershopDetails = async () => {
      try {
        const response = await getBarbershopById(id);
        setBarbershop(response.data);
      } catch (err) {
        setError('Failed to fetch barbershop details. Please try again later.');
      }
    };

    fetchBarbershopDetails();
  }, [id]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!barbershop) {
    return <div>Loading...</div>;
  }

  return (
    <div className="barbershop-details">
      {/* Barre de navigation */}
      <div className="barbershop-nav">
      <NavLink to={`/admin`} activeClassName="active-link">Acceuil</NavLink>
        <NavLink to={`/barbershopDetails/${id}`} activeClassName="active-link">Details</NavLink>
        <NavLink to={`/portfolios/${id}`} activeClassName="active-link">Portfolios</NavLink>
        <NavLink to={`/getratings/${id}`} activeClassName="active-link">Ratings</NavLink>
        <NavLink to={`/reservations/${id}`} activeClassName="active-link">Reservations</NavLink>
        <NavLink to={`/Aservices/${id}`} activeClassName="active-link">Services</NavLink>

      </div>

      {/* Contenu de la page */}
      <div className="details-container">
        {barbershop.image && (
          <div className="image-container">
            <img src={`http://localhost:5000/${barbershop.image}`} alt={barbershop.name} className="barbershop-image" />
          </div>
        )}
        <h2>{barbershop.name}</h2>
        <p><strong>Address:</strong> {barbershop.address}</p>
        <p><strong>Phone:</strong> {barbershop.phone}</p>
        <p><strong>Description:</strong> {barbershop.description}</p>
        <p><strong>Owner:</strong> {barbershop.owner.name}</p>
        <p><strong>Email:</strong> {barbershop.owner.email}</p>
      </div>
    </div>
  );
};

export default BarbershopDetails;
