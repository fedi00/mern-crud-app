    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const ServiceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    barbershop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Barbershop',
        required: true
    }
    }, { timestamps: true });

    module.exports = mongoose.model('Service', ServiceSchema);
