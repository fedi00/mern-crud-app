const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const barbershopController = require('../controllers/BarbershopController');

// Register route
router.post('/register', register);
// Login route
router.post('/login', login);

module.exports = router;