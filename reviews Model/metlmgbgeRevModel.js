// models/reviewModel.js

const mongoose = require('mongoose');

const metlmgbdgSchema = new mongoose.Schema({
    
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },  // Ensure rating is a number
    comment: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Metalmgbadge' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
});

const Metalmgbadge_Review = mongoose.model('Metalmgbadge_Review', metlmgbdgSchema);

module.exports = Metalmgbadge_Review;
