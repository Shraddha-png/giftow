// models/reviewModel.js

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },  // Ensure rating is a number
    comment: { type: String, required: true },
    sportstshirtproduct: { type: mongoose.Schema.Types.ObjectId, ref: 'Sport_tshirt' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
});

const Sport_tshirt_Review = mongoose.model('Sport_tshirt_Review', reviewSchema);

module.exports = Sport_tshirt_Review;
