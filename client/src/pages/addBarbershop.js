import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './addBarbershop.css';

const AddBarbershop = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file)); // Met à jour l'aperçu de l'image
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('address', address);
    formData.append('phone', phone);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      await api.post('barbershops/addB', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/admin');
    } catch (error) {
      setError('Erreur lors de l\'ajout du barbershop.');
    }
  };

  return (
    <div className="add-barbershop">
      <h1>Ajouter un Barbershop</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nom :</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Adresse :</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Téléphone :</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description :</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image :</label>
          <input
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
          />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Aperçu" />
            </div>
          )}
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddBarbershop;
