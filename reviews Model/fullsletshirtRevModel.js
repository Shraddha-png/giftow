// models/reviewModel.js

const mongoose = require('mongoose');

const fullslvSchema = new mongoose.Schema({
    
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },  // Ensure rating is a number
    comment: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Fullsleave_tshirt' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
});

const Fullsleave_tshirt_Review = mongoose.model('Fullsleave_tshirt_Review', fullslvSchema);

module.exports = Fullsleave_tshirt_Review;
