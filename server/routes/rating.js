// routes/ratingRoutes.js
const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/RatingController');
const auth = require('../middleware/auth');

// Route pour ajouter une note à un barbershop
router.post('/addrating/:barbershopId', auth, ratingController.addRating);

// Route pour récupérer toutes les notes d'un barbershop
router.get('/getrating/:barbershopId', ratingController.getBarbershopRatings);
// Route pour obtenir la moyenne des ratings d'un barbershop
router.get('/average/:barbershopId', ratingController.getAverageRating);

module.exports = router;
