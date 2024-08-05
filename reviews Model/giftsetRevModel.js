// models/reviewModel.js

const mongoose = require('mongoose');

const giftsetSchema = new mongoose.Schema({
    
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },  // Ensure rating is a number
    comment: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Giftset' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
});

const Giftset_Review = mongoose.model('Giftset_Review', giftsetSchema);

module.exports = Giftset_Review;
