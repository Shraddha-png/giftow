// models/reviewModel.js

const mongoose = require('mongoose');

const pockmgbdgSchema = new mongoose.Schema({
    
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },  // Ensure rating is a number
    comment: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Pocmgbadge' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
});

const Pocmgbadge_Review = mongoose.model('Pocmgbadge_Review', pockmgbdgSchema);

module.exports = Pocmgbadge_Review;
