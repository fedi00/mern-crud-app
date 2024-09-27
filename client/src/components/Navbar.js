import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Assurez-vous de créer ce fichier CSS pour le style
import logo from '../images/logo.png'; // Assurez-vous que le chemin est correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const navigate = useNavigate();

  // Vérifie si l'utilisateur est connecté
  const isLoggedIn = localStorage.getItem('token') !== null;

  // Fonction pour se déconnecter
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); // Redirige vers la page d'accueil après la déconnexion
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="Logo" className="logo-image" />
          </Link>
        </div>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              <FontAwesomeIcon icon={faHome} className="navbar-icon" /> Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/about" className="navbar-link">
              <FontAwesomeIcon icon={faInfoCircle} className="navbar-icon" /> About
            </Link>
          </li>
          <li className="navbar-item">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="navbar-logout">
                <FontAwesomeIcon icon={faSignOutAlt} className="navbar-icon" /> Logout
              </button>
            ) : (
              <Link to="/login" className="navbar-link">
                <FontAwesomeIcon icon={faSignInAlt} className="navbar-icon" /> Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
