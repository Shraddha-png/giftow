// models/reviewModel.js

const mongoose = require('mongoose');

const stationarySchema = new mongoose.Schema({
    
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },  // Ensure rating is a number
    comment: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Stationeries' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
});

const Stationerie_Review = mongoose.model('Stationerie_Review', stationarySchema);

module.exports = Stationerie_Review;