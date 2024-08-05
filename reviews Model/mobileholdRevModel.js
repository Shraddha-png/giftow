// models/reviewModel.js

const mongoose = require('mongoose');

const mobholdSchema = new mongoose.Schema({
    
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },  // Ensure rating is a number
    comment: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Mobilehold' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
});

const Mobilehold_Review = mongoose.model('Mobilehold_Review', mobholdSchema);

module.exports = Mobilehold_Review;
