import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBarbershopsByOwner, deleteBarbershop } from '../services/api';
import './admin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const Admin = () => {
  const [barbershops, setBarbershops] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBarbershops = async () => {
      try {
        const response = await getBarbershopsByOwner();
        setBarbershops(response.data);
      } catch (err) {
        setError('Failed to fetch barbershops. Please try again later.');
      }
    };

    fetchBarbershops();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteBarbershop(id);
      setBarbershops(barbershops.filter(barbershop => barbershop._id !== id));
    } catch (err) {
      setError('Failed to delete barbershop. Please try again later.');
    }
  };

  return (
    <div className="barbershop-list">
      <Link to="/addBarbershop" className="add-barbershop-button">
        <FontAwesomeIcon icon={faPlus} className="add-barbershop-icon" /> Ajouter un salon
      </Link>
      {error && <div className="error-message">{error}</div>}
      {barbershops.length === 0 ? (
  <div className="no-barbershop-message">
    <p>You don't have a barbershop yet. Click on the button below to add one.</p>
    <Link to="/addBarbershop" className="add-barbershop-button">
      Add a Barbershop
    </Link>
  </div>
) : (
  <div className="cards-container">
    {barbershops.map((barbershop) => (
      <div key={barbershop._id} className="card">
        <div className="card-image-container">
          {barbershop.image && (
            <img 
              src={`http://localhost:5000/${barbershop.image}`} 
              alt={barbershop.name} 
              className="card-image"
            />
          )}
        </div>
        <div className="card-content">
          <h3 className="card-title">{barbershop.name}</h3>
          <p className="card-description"><strong>Nom:</strong> {barbershop.name}</p>
          <p className="card-address"><strong>Adresse:</strong> {barbershop.address}</p>
          <p className="card-phone"><strong>Téléphone:</strong> {barbershop.phone}</p>
        </div>
        <div className="card-buttons">
          <Link to={`/barbershopDetails/${barbershop._id}`} className="card-button details">
            <FontAwesomeIcon icon={faInfoCircle} className="card-button-icon" /> Détails
          </Link>
          <Link to={`/editBarbershop/${barbershop._id}`} className="card-button">
            <FontAwesomeIcon icon={faEdit} className="card-button-icon" /> Modifier
          </Link>
          <button className="card-button delete" onClick={() => handleDelete(barbershop._id)}>
            <FontAwesomeIcon icon={faTrash} className="card-button-icon" /> Supprimer
          </button>
        </div>
      </div>
    ))}
  </div>
)}

    </div>
  );
};

export default Admin;
