// models/reviewModel.js

const mongoose = require('mongoose');

const shotglassSchema = new mongoose.Schema({
    
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },  // Ensure rating is a number
    comment: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Shotglass' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
});

const Shotglass_Review = mongoose.model('Shotglass_Review', shotglassSchema);

module.exports = Shotglass_Review;