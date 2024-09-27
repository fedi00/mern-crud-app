import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,NavLink } from 'react-router-dom';
import './ClientServices.css'; // Assurez-vous d'ajouter du CSS pour styliser la page

const BarbershopServices = () => {
  const { id } = useParams(); // Récupère l'ID du barbershop depuis l'URL
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`/api/services/Sbarbershop/${id}`);
        setServices(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des services', err);
        setError('Erreur lors de la récupération des services');
        setLoading(false);
      }
    };

    fetchServices();
  }, [id]);

  if (loading) {
    return <div className="loading">Chargement des services...</div>;
  }

  return (
    <div className="barbershop-services">
              <div className="barbershop-nav">
              <NavLink to={`/client`} activeClassName="active-link">Acceuil</NavLink>
        <NavLink to={`/profile/${id}`} activeClassName="active-link">Profile</NavLink>
        <NavLink to={`/clientportfoglio/${id}`} activeClassName="active-link">Portfolios</NavLink>
        <NavLink to={`/ratings/${id}`} activeClassName="active-link">Ratings</NavLink>
        <NavLink to={`/Breservations/${id}`} activeClassName="active-link">Reservations</NavLink>
        <NavLink to={`/Cservices/${id}`} activeClassName="active-link">Services</NavLink>

      </div>
      <h1>Services du Barbershop</h1>
      {error && <p className="error">{error}</p>}
      {services.length === 0 ? (
        <p>Aucun service trouvé pour ce barbershop.</p>
      ) : (
        <div className="services-list">
          {services.map(service => (
            <div className="service-card" key={service._id}>
              <h2 className="service-name">{service.name}</h2>
              <p className="service-description">{service.description}</p>
              <p className="service-price">Prix: {service.price} TND</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BarbershopServices;
