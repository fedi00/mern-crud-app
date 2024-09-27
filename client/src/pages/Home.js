import React from 'react';
import './Home.css'; // Assurez-vous d'avoir ce fichier CSS pour les styles
import Barber from '../images/barber.jpg'; // Assurez-vous que le chemin est correct
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-description">
        <h1>Welcome to StyleBook</h1>
        <p>
          Discover top-notch barbers and book your appointment with ease. Our platform
          connects you with skilled professionals to ensure you look and feel your best.
        </p>
        <p>
          Browse through a wide selection of salons, read reviews, and find the perfect
          stylist for your needs. Whether it's a quick trim or a complete makeover, 
          we've got you covered.
        </p>
        <Link to="/login" className="cta-button">Discover Our Barbershops!</Link>
      </div>
      <div className="home-image">
      <img src={Barber} alt="Barbershop"/>
      </div>
    </div>
  );
};

export default Home;
