// models/reviewModel.js

const mongoose = require('mongoose');

const roundmbdgSchema = new mongoose.Schema({
    
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },  // Ensure rating is a number
    comment: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Roundmagbadge' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
});

const Roundmagbadge_Review = mongoose.model('Roundmagbadge_Review', roundmbdgSchema);

module.exports = Roundmagbadge_Review;
