const mongoose = require('mongoose');

const tshirtSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        variety:{type: String, required: true},
        code:{type: String, required: true},
        treviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tshirt_Review' }],
        rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
        numReviews: { type: Number, default: 0, required: true },
        description: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

const Tshirt = mongoose.model('Tshirt', tshirtSchema);

module.exports = Tshirt;
