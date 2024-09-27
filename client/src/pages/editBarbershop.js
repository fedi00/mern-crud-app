import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBarbershopById, updateBarbershop } from '../services/api';
import './editBarbershop.css'; // Assurez-vous d'importer le fichier CSS

const EditBarbershop = () => {
  const { id } = useParams(); // Récupère l'ID du barbershop depuis l'URL
  const navigate = useNavigate();
  const [barbershop, setBarbershop] = useState({
    name: '',
    address: '',
    phone: '',
    description: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    // Fonction pour obtenir les détails du barbershop
    const fetchBarbershop = async () => {
      try {
        const response = await getBarbershopById(id);
        setBarbershop(response.data);
        setImagePreview(response.data.image); // Affiche l'image existante si disponible
      } catch (error) {
        console.error('Erreur lors de la récupération du barbershop:', error);
      }
    };

    fetchBarbershop();
  }, [id]);

  // Fonction pour gérer le changement des champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBarbershop({ ...barbershop, [name]: value });
  };

  // Fonction pour gérer le changement de l'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBarbershop({ ...barbershop, image: file });
      setImagePreview(URL.createObjectURL(file)); // Affiche l'aperçu de l'image
    }
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', barbershop.name);
    formData.append('address', barbershop.address);
    formData.append('phone', barbershop.phone);
    formData.append('description', barbershop.description);
    if (barbershop.image) {
      formData.append('image', barbershop.image);
    }

    try {
      await updateBarbershop(id, formData);
      navigate('/admin'); // Redirige vers la liste des barbershops après la mise à jour
    } catch (error) {
      console.error('Erreur lors de la mise à jour du barbershop:', error);
    }
  };

  return (
    <div className="edit-container">
      <h1 className="edit-title">Modifier le Barbershop</h1>
      <form onSubmit={handleSubmit} className="edit-form">
        <div className="edit-form-group">
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            id="name"
            name="name"
            value={barbershop.name}
            onChange={handleChange}
            className="edit-input"
            required
          />
        </div>

        <div className="edit-form-group">
          <label htmlFor="address">Adresse</label>
          <input
            type="text"
            id="address"
            name="address"
            value={barbershop.address}
            onChange={handleChange}
            className="edit-input"
            required
          />
        </div>

        <div className="edit-form-group">
          <label htmlFor="phone">Téléphone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={barbershop.phone}
            onChange={handleChange}
            className="edit-input"
            required
          />
        </div>

        <div className="edit-form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={barbershop.description}
            onChange={handleChange}
            className="edit-textarea"
            required
          />
        </div>

        <div className="edit-form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="edit-file-input"
          />
          {imagePreview && (
            <div className="edit-image-preview">
              <img src={imagePreview} alt="Aperçu" />
            </div>
          )}
        </div>

        <button type="submit" className="edit-submit-btn">
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default EditBarbershop;
