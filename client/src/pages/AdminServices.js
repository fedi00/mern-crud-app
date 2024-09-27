import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, NavLink,useNavigate } from 'react-router-dom';
import './AdminServices.css';

const AdminServices = () => {
  const { id } = useParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`/api/services/Sbarbershop/${id}`);
        setServices(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des services', error);
        setLoading(false);
      }
    };

    fetchServices();
  }, [id]);

  const handleDelete = async (serviceId) => {
    try {
      await axios.delete(`/api/services/deleteS/${serviceId}`);
      setServices(services.filter(service => service._id !== serviceId));
    } catch (error) {
      console.error('Erreur lors de la suppression du service', error);
    }
  };

  const handleEdit = (serviceId) => {
    navigate(`/editServices/${serviceId}`);
  };

  const handleAdd = () => {
    navigate(`/AddServices/${id}`);
  };

  if (loading) {
    return <p className="loading">Chargement des services...</p>;
  }

  return (
    <div className="admin-services">
      <div className="barbershop-nav">
      <NavLink to={`/admin`} activeClassName="active-link">Acceuil</NavLink>
        <NavLink to={`/barbershopDetails/${id}`} activeClassName="active-link">Details</NavLink>
        <NavLink to={`/portfolios/${id}`} activeClassName="active-link">Portfolios</NavLink>
        <NavLink to={`/getratings/${id}`} activeClassName="active-link">Ratings</NavLink>
        <NavLink to={`/reservations/${id}`} activeClassName="active-link">Reservations</NavLink>
        <NavLink to={`/Aservices/${id}`} activeClassName="active-link">Services</NavLink>

      </div>
      <header className="header">
        <h1>Liste des Services</h1>
        <button className="btn add-btn" onClick={handleAdd}>Ajouter un Service</button>
      </header>
      {services.length === 0 ? (
        <p>Aucun service trouvé.</p>
      ) : (
        <ul className="service-list">
          {services.map(service => (
            <li key={service._id} className="service-item">
              <div className="service-details">
                <h2 className="service-name">{service.name}</h2>
                <p className="service-description">Description: {service.description}</p>
                <p className="service-price">Prix: {service.price} TND</p>
              </div>
              <div className="service-actions">
                <button className="btn edit-btn" onClick={() => handleEdit(service._id)}>Modifier</button>
                <button className="btn delete-btn" onClick={() => handleDelete(service._id)}>Supprimer</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminServices;
