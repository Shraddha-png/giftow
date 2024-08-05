const mongoose = require('mongoose');

const brochureSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String, required: true },
        variety:{type: String, required: true},
        code:{type: String, required: true},
        description: { type: String, required: true },
        brochurereviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Brochure_Review' }],
        rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
        numReviews: { type: Number, default: 0, required: true },
    },
    {
        timestamps: true
    }
);

const Brochure = mongoose.model('Brochure', brochureSchema);

module.exports = Brochure;
