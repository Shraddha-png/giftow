// models/reviewModel.js

const mongoose = require('mongoose');

const travel_mugSchema = new mongoose.Schema({
    
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },  // Ensure rating is a number
    comment: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Travelmug' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
});

const Travelmug_Review = mongoose.model('Travelmug_Review', travel_mugSchema);

module.exports = Travelmug_Review;
