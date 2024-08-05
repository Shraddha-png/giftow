// models/reviewModel.js

const mongoose = require('mongoose');

const hotcold_sipSchema = new mongoose.Schema({
    
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },  // Ensure rating is a number
    comment: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotcoldsipper' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
});

const HotColdSip_Review = mongoose.model('HotColdSip_Review', hotcold_sipSchema);

module.exports = HotColdSip_Review;
