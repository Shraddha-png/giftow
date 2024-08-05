// models/reviewModel.js

const mongoose = require('mongoose');

const lunchboxSchema = new mongoose.Schema({
    
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },  // Ensure rating is a number
    comment: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'LunchBox' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
});

const LunchBox_Review = mongoose.model('LunchBox_Review', lunchboxSchema);

module.exports = LunchBox_Review;
