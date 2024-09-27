const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config(); // Charge les variables d'environnement depuis le fichier .env
const cors = require('cors');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Origine autorisée
    credentials: true // Autoriser l'envoi de cookies
}));
app.use(express.json({ extended: false }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/barbershops', require('./routes/barbershops')); // Ajoutez cette ligne pour gérer les barbershops
app.use('/api/portfolios', require('./routes/portfolios')); // Ajoutez cette ligne pour gérer les barbershops
app.use('/api/reservations', require('./routes/reservation')); // Ajoutez cette ligne pour gérer les barbershops
app.use('/api/ratings', require('./routes/rating')); // Ajoutez cette ligne pour gérer les barbershops
app.use('/api/services', require('./routes/service')); // Ajoutez cette ligne pour gérer les barbershops

app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
