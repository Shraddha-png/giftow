// models/reviewModel.js

const mongoose = require('mongoose');

const singlewallsipSchema = new mongoose.Schema({
    
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },  // Ensure rating is a number
    comment: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Singleawllsipper' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
});

const Singleawllsipper_Review = mongoose.model('Singleawllsipper_Review', singlewallsipSchema);

module.exports = Singleawllsipper_Review;
