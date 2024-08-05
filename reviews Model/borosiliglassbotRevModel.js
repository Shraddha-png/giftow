// models/reviewModel.js

const mongoose = require('mongoose');

const borosiliglassbotSchema = new mongoose.Schema({
    
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },  // Ensure rating is a number
    comment: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Borosilicatesipper' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
});

const Borosilicatesipper_Review = mongoose.model('Borosilicatesipper_Review', borosiliglassbotSchema);

module.exports = Borosilicatesipper_Review;
