// models/reviewModel.js

const mongoose = require('mongoose');

const coasterSchema = new mongoose.Schema({
    
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },  // Ensure rating is a number
    comment: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Coaster' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
});

const Coaster_Review = mongoose.model('Coaster_Review', coasterSchema);

module.exports = Coaster_Review;
