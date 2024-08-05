// models/reviewModel.js

const mongoose = require('mongoose');

const homekeySchema = new mongoose.Schema({
    
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },  // Ensure rating is a number
    comment: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Home_keychain' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
});

const Home_keychain_Review = mongoose.model('Home_keychain_Review', homekeySchema);

module.exports = Home_keychain_Review;
