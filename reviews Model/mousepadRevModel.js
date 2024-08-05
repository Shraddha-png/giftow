// models/reviewModel.js

const mongoose = require('mongoose');

const mousepadSchema = new mongoose.Schema({
    
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },  // Ensure rating is a number
    comment: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Mousepad' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
});

const Mousepad_Review = mongoose.model('Mousepad_Review', mousepadSchema);

module.exports = Mousepad_Review;
