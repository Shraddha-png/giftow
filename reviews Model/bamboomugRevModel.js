// models/reviewModel.js

const mongoose = require('mongoose');

const bamboo_mugSchema = new mongoose.Schema({
    
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },  // Ensure rating is a number
    comment: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Bamboomug' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
});

const Bamboomug_Review = mongoose.model('Bamboomug_Review', bamboo_mugSchema);

module.exports = Bamboomug_Review;
