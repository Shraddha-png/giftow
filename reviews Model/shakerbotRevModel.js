// models/reviewModel.js

const mongoose = require('mongoose');

const shakerbotSchema = new mongoose.Schema({
    
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },  // Ensure rating is a number
    comment: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Shakkerbottle' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
});

const Shakkerbottle_Review = mongoose.model('Shakkerbottle_Review', shakerbotSchema);

module.exports = Shakkerbottle_Review;
