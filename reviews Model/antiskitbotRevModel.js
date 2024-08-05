// models/reviewModel.js

const mongoose = require('mongoose');

const antiskitbotSchema = new mongoose.Schema({
    
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },  // Ensure rating is a number
    comment: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Antiskitbottles' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
});

const Antiskitbottles_Review = mongoose.model('Antiskitbottles_Review', antiskitbotSchema);

module.exports = Antiskitbottles_Review;
