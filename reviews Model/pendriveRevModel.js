// models/reviewModel.js

const mongoose = require('mongoose');

const pendriveSchema = new mongoose.Schema({
    
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },  // Ensure rating is a number
    comment: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Pendrive' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
});

const Pendrive_Review = mongoose.model('Pendrive_Review', pendriveSchema);

module.exports = Pendrive_Review;
