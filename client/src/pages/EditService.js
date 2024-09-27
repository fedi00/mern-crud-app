import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditService.css';

const EditService = () => {
  const { id } = useParams(); // ID du service à modifier
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [barbershopId, setBarbershopId] = useState('');

  const navigate = useNavigate();
   
    useEffect(() => {
      const fetchService = async () => {
        try {
          const response = await axios.get(`/api/services/getS/${id}`);
          const service = response.data;
          setName(service.name);
          setDescription(service.description);
          setPrice(service.price);
          setBarbershopId(service.barbershop); // Récupérer l'ID de la barbershop
          setLoading(false);
        } catch (err) {
          console.error('Erreur lors de la récupération du service', err);
          setError('Erreur lors de la récupération des données');
          setLoading(false);
        }
      };
    
      fetchService();
    }, [id]);
    
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/api/services/updateS/${id}`, {
        name,
        description,
        price
      });

      navigate(`/Aservices/${barbershopId}`); // Redirige vers la liste des services après modification
    } catch (err) {
      setError('Erreur lors de la modification du service');
    }
  };

  if (loading) {
    return <p>Chargement des données...</p>;
  }

  return (
    <div className="edit-service">
      <h1>Modifier le Service</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="price">Prix</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn submit-btn">Modifier</button>
      </form>
    </div>
  );
};

export default EditService;
