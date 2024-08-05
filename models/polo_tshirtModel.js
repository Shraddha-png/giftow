
const mongoose = require('mongoose');

const polo_tshirtSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        variety:{type: String, required: true},
        description: { type: String, required: true },
        polotshirtreviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Polo_tshirt_Review' }],
        rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
        numReviews: { type: Number, default: 0, required: true },
    },
    {
        timestamps: true
    }
);

const Polo_tshirt= mongoose.model('Polo_tshirt', polo_tshirtSchema);

module.exports = Polo_tshirt;
