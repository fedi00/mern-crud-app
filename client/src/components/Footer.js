import React from 'react';
import './Footer.css';
import Facebook from '../images/Facebook.png';
import instagram from '../images/instagram.png';
import twitter from '../images/twitter.png';
import google from '../images/google.png';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <>
      <div id="main-content">
        {/* Contenu principal de la page ici */}
      </div>
      <footer className="footer">
        <div className="container">
          <div className="footer-section about">
            <h2>À propos</h2>
            <p>StyleBook est la plateforme en ligne numéro un pour réserver des rendez-vous de salon de coiffure à Tunis. Notre mission est de vous aider à trouver le meilleur salon de coiffure près de chez vous.</p>
          </div>
          <div className="footer-section links">
            <h2>Liens rapides</h2>
            <ul>
            <li><Link to="/">Accueil</Link></li>
        <li><Link to="/about">À propos</Link></li>
        <li><Link to="/login">Se connecter</Link></li>
        <li><Link to="/register">S'inscrire</Link></li>
            </ul>
          </div>
          <div className="footer-section contact">
            <h2>Contactez-nous</h2>
            <ul>
              <li><i className="fas fa-map-marker-alt"></i> Tunis, Tunisie</li>
              <li><i className="fas fa-phone"></i> +216 123 456 789</li>
              <li><i className="fas fa-envelope"></i> contact@stylebook.com</li>
            </ul>
          </div>
          <div className="footer-section social">
            <h2>Suivez-nous</h2>
            <ul className="social-icons">
              <a className="btn bgRed p-1 m-1" href="#" role="button">
                <img src={Facebook} width="40%" className="m-1" alt="Facebook" />
              </a>
              <a className="btn bgRed p-1 m-1" href="#" role="button">
                <img src={twitter} width="90%" className="m-1" alt="Twitter" />
              </a>
              <a className="btn bgRed p-1 m-1" href="#" role="button">
                <img src={instagram} width="75%" className="m-1" alt="Instagram" />
              </a>
              <a className="btn bgRed p-1 m-1" href="#" role="button">
                <img src={google} width="75%" className="m-1" alt="Google" />
              </a>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 StyleBook. Tous droits réservés.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
