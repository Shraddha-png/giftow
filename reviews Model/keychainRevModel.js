// models/reviewModel.js

const mongoose = require('mongoose');

const keychainSchema = new mongoose.Schema({
    
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },  // Ensure rating is a number
    comment: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Keychain' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
});

const Keychain_Review = mongoose.model('Keychain_Review', keychainSchema);

module.exports = Keychain_Review;
