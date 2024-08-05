const mongoose = require('mongoose');

const metmgbadgeSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        variety:{type: String, required: true},
        code:{type: String, required: true},
        description: { type: String, required: true },
        material: { type: String, required: true },
        metlmgbdgreviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Metalmgbadge_Review' }],
        rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
        numReviews: { type: Number, default: 0, required: true },
        
    },
    {
        timestamps: true
    }
);

const Metalmgbadge = mongoose.model('Metalmgbadge', metmgbadgeSchema);

module.exports = Metalmgbadge;

