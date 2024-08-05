const mongoose = require('mongoose');

const sublimation_itemSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        category: { type: String, required: true },
        price: { type: Number, required: true },
        variety:{type: String, required: true},
        code:{type: String, required: true},
        description: { type: String, required: true },
        sublimatereviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sublimation_item_Review' }],
        rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
        numReviews: { type: Number, default: 0, required: true },
    },
    {
        timestamps: true
    }
);

const Sublimation_item = mongoose.model('Sublimation_item', sublimation_itemSchema);

module.exports = Sublimation_item;
