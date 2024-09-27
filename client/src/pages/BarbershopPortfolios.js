import React, { useEffect, useState } from 'react';
import { getPortfolioByBarbershopId, addImagesToPortfolio, deleteImageFromPortfolio } from '../services/api';
import './BarbershopPortfolios.css';
import { useParams, NavLink } from 'react-router-dom';

const BarbershopPortfolios = () => {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await getPortfolioByBarbershopId(id);
        if (data.images.length === 0) {
          setError(data.message || 'No portfolio yet');
        } else {
          setPortfolio(data);
        }
      } catch (err) {
        setError('Failed to fetch portfolio.');
      }
    };

    fetchPortfolio();
  }, [id]);

  const handleImageUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setFiles(uploadedFiles);

    // Prévisualiser les images sélectionnées
    const filePreviews = uploadedFiles.map(file => URL.createObjectURL(file));
    setPreviews(filePreviews);
  };

  const uploadImages = async () => {
    if (files.length > 0) {
      try {
        const data = await addImagesToPortfolio(id, files);
        setPortfolio(data);
        setFiles([]);
        setPreviews([]);
      } catch (err) {
        setError('Failed to upload images.');
      }
    }
  };

  const handleImageDelete = async (imageId) => {
    try {
      await deleteImageFromPortfolio(id, imageId);
      setPortfolio(prevPortfolio => ({
        ...prevPortfolio,
        images: prevPortfolio.images.filter(image => image !== imageId)
      }));
    } catch (err) {
      setError('Failed to delete image.');
    }
  };

  if (error) {
    return (
      <div className="barbershop-portfolios">
        <h2>Portfolios</h2>
        <div className="no-portfolio-message">{error}</div>
        <input
          type="file"
          multiple
          onChange={handleImageUpload}
          style={{ display: 'none' }}
          id="image-upload"
        />
        <label htmlFor="image-upload" className="upload-button">
          <i className="fa fa-plus"></i> Add Images
        </label>
        {previews.length > 0 && (
          <div className="image-previews">
            {previews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Preview ${index}`}
                className="preview-image"
              />
            ))}
          </div>
        )}
        {files.length > 0 && (
          <button onClick={uploadImages} className="upload-images-button">
            Upload
          </button>
        )}
      </div>
    );
  }

  if (!portfolio) {
    return <div>Loading...</div>;
  }

  return (
    <div className="barbershop-portfolios">
      <div className="barbershop-nav">
      <NavLink to={`/admin`} activeClassName="active-link">Acceuil</NavLink>
        <NavLink to={`/barbershopDetails/${id}`} activeClassName="active-link">Details</NavLink>
        <NavLink to={`/portfolios/${id}`} activeClassName="active-link">Portfolios</NavLink>
        <NavLink to={`/getratings/${id}`} activeClassName="active-link">Ratings</NavLink>
        <NavLink to={`/reservations/${id}`} activeClassName="active-link">Reservations</NavLink>
        <NavLink to={`/Aservices/${id}`} activeClassName="active-link">Services</NavLink>

      </div>
      <h2>Portfolios</h2>
      <div className="portfolio-images">
        {portfolio.images.map((image, index) => (
          <div key={index} className="image-container">
            <img
              src={`http://localhost:5000/uploads/${image}`}
              alt={`Portfolio ${index}`}
              className="portfolio-image"
            />
            <button
              className="delete-buttonn"
              onClick={() => handleImageDelete(image)}
            >
              <i className="fa fa-trash"></i> Delete
            </button>
          </div>
        ))}
      </div>
      <input
        type="file"
        multiple
        onChange={handleImageUpload}
        style={{ display: 'none' }}
        id="image-upload"
      />
      <label htmlFor="image-upload" className="upload-button">
        <i className="fa fa-plus"></i> Add Images
      </label>
      {previews.length > 0 && (
        <div className="image-previews">
          {previews.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`Preview ${index}`}
              className="preview-image"
            />
          ))}
        </div>
      )}
      {files.length > 0 && (
        <button onClick={uploadImages} className="upload-images-button">
          Upload
        </button>
      )}
    </div>
  );
};

export default BarbershopPortfolios;
