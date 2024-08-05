// models/reviewModel.js

const mongoose = require('mongoose');

const mgnamplateSchema = new mongoose.Schema({
    
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },  // Ensure rating is a number
    comment: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Mgnameplate' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
});

const MagnamPlate_Review = mongoose.model('MagnamPlate_Review', mgnamplateSchema);

module.exports = MagnamPlate_Review;
