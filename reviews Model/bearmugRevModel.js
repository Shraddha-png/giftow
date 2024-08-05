// models/reviewModel.js

const mongoose = require('mongoose');

const bearmugSchema = new mongoose.Schema({
    
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },  // Ensure rating is a number
    comment: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Bearmug' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
});

const Bearmug_Review = mongoose.model('Bearmug_Review', bearmugSchema);

module.exports = Bearmug_Review;
