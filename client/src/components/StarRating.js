// src/components/StarRating.js
import React from 'react';
import './StarRating.css'; // Assurez-vous que le chemin est correct

const StarRating = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <span key={index} className={index < rating ? 'star filled' : 'star'}>★</span>
  ));

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
