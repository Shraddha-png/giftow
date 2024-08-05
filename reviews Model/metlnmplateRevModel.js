// models/reviewModel.js

const mongoose = require('mongoose');

const mtlnmplateSchema = new mongoose.Schema({
    
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },  // Ensure rating is a number
    comment: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Metalnmplate' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
});

const Metalnmplate_Review = mongoose.model('Metalnmplate_Review', mtlnmplateSchema);

module.exports = Metalnmplate_Review;
