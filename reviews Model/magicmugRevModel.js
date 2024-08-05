// models/reviewModel.js

const mongoose = require('mongoose');

const magicmugSchema = new mongoose.Schema({
    
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },  // Ensure rating is a number
    comment: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Magicmug' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
});

const Magicmug_Review = mongoose.model('Magicmug_Review', magicmugSchema);

module.exports = Magicmug_Review;
