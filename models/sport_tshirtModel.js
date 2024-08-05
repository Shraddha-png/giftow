
const mongoose = require('mongoose');

const sport_tshirtSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        variety:{type: String, required: true},
        description: { type: String, required: true },
        sportstshreviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sport_tshirt_Review' }],
        rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
        numReviews: { type: Number, default: 0, required: true },
        
    },
    {
        timestamps: true
    }
);

const Sport_tshirt= mongoose.model('Sport_tshirt', sport_tshirtSchema);

module.exports = Sport_tshirt;
