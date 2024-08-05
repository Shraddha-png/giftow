const mongoose = require('mongoose');

const cushion_coversSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        cushionCoverreviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cushion_covers_Review' }],
        rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
        numReviews: { type: Number, default: 0, required: true },
       
        description: { type: String, required: true },
    },
    {
        timestamps: true
    }
);

const Cushion_covers = mongoose.model('Cushion_covers', cushion_coversSchema);

module.exports = Cushion_covers;
