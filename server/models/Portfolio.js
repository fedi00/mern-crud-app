const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PortfolioSchema = new Schema({
  images: [{
    type: String,
    required: true
  }],
  barbershop: {
    type: Schema.Types.ObjectId,
    ref: 'Barbershop',
    required: true
  }
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
