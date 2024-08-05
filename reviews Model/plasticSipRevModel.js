// models/reviewModel.js

const mongoose = require('mongoose');

const plasticsipSchema = new mongoose.Schema({
    
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },  // Ensure rating is a number
    comment: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Award' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
});

const Plasticsipper_Review = mongoose.model('Plasticsipper_Review', plasticsipSchema);

module.exports = Plasticsipper_Review;
