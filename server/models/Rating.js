// models/Rating.js
const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5  // Limite entre 1 et 5 étoiles
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    barbershopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Barbershop',
        required: true
    }
}, { timestamps: true });

const Rating = mongoose.model('Rating', ratingSchema);
module.exports = Rating;
