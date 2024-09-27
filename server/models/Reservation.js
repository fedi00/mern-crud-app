// models/Reservation.js
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  barbershop: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Barbershop', 
    required: true 
  },
  reservationTime: { 
    type: Date, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Acceptée', 'Supprimée', 'Non traitée'], 
    default: 'Non traitée' 
  }
});

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;
