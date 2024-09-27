const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BarbershopSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String, // Stocke le chemin de l'image ou l'URL
    required: false
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Associe le barbershop à un utilisateur propriétaire
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Barbershop', BarbershopSchema);
