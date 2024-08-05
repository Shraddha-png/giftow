// models/reviewModel.js

const mongoose = require('mongoose');

const roundpinbdgSchema = new mongoose.Schema({
    
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },  // Ensure rating is a number
    comment: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Roundpinbadge' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
});

const  Roundpinbadge_Review = mongoose.model('Roundpinbadge_Review', roundpinbdgSchema);

module.exports = Roundpinbadge_Review;
