const mongoose = require('mongoose');

const coasterSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String, required: true },
        variety:{type: String, required: true},
        code:{type: String, required: true},
        description: { type: String, required: true },
        coastreviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Coaster_Review' }],
        rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
        numReviews: { type: Number, default: 0, required: true },
    },
    {
        timestamps: true
    }
);

const Coaster = mongoose.model('Coaster', coasterSchema);

module.exports = Coaster;

