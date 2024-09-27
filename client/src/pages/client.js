import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './client.css';

const Client = () => {
  const [barbershops, setBarbershops] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchBarbershops();
  }, []);

  const fetchBarbershops = async (query = '') => {
    try {
      const response = await axios.get(`/api/barbershops/getB?search=${query}`);
      setBarbershops(response.data);
    } catch (error) {
      console.error('Error fetching barbershops:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    fetchBarbershops(event.target.value);
  };

  const navigateToProfile = (barbershopId) => {
    navigate(`/profile/${barbershopId}`);
  };

  const navigateToReservations = () => {
    navigate('/Creservations'); // Redirige vers la page des réservations
  };

  return (
    <div className="barbershop-list">
      <div className="search-container">
        <h1 className="title">Barbershops à Tunis</h1>
        <button 
          className="reservations-button"
          onClick={navigateToReservations}
        >
          Mes Réservations
        </button>
        <input
          type="text"
          placeholder="Rechercher un barbershop..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-bar"
        />
       
      </div>
      <div className="barbershop-cards">
        {barbershops.map((barbershop) => (
          <div key={barbershop._id} className="barbershop-card">
            <img src={`/${barbershop.image}`} alt={barbershop.name} className="barbershop-image3" />
            <div className="barbershop-info">
              <h3 className="barbershop-name">{barbershop.name}</h3>
              <p className="barbershop-address">{barbershop.address}</p>
              <p className="barbershop-phone">{barbershop.phone}</p>
              <p className="barbershop-description">{barbershop.description}</p>
              <button 
                className="profile-button" 
                onClick={() => navigateToProfile(barbershop._id)}>
                Voir Profil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Client;
