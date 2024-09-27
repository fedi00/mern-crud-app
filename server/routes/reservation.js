const express = require('express');
const { createReservation,deleteReservation,getBarbershopAvailability, getUserReservations, getBarbershopReservations, updateReservationStatus } = require('../controllers/ReservationController');
const auth = require('../middleware/auth'); // Middleware d'authentification

const router = express.Router();

// Route pour créer une réservation (authentification requise)
router.post('/create', auth, createReservation);

// Route pour obtenir les réservations de l'utilisateur connecté (authentification requise)
router.get('/user', auth, getUserReservations);

// Route pour obtenir les réservations d'un barbershop spécifique (public)
router.get('/barbershop/:barbershopId', getBarbershopReservations);
router.patch('/status/:reservationId', auth, updateReservationStatus);
router.get('/availability/:barbershopId', getBarbershopAvailability);
// Route pour supprimer une réservation
router.delete('/Dreservations/:reservationId', auth, deleteReservation);

module.exports = router;
