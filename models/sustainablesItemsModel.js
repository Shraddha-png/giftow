const mongoose = require('mongoose');

const sustanableSchema = new mongoose.Schema(
    {
        name: { type: String, required: true},
        slug: { type: String, required: true, unique: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        material: { type: String, required: true },
        variety:{type: String, required: true},
        code:{type: String, required: true},
        description: { type: String, required: true }, 
        susitemreviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SustainablesItems_Review' }],
        rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
        numReviews: { type: Number, default: 0, required: true },
       
    },
    {
        timestamps: true
    }
);

const SustainablesItems = mongoose.model('SustainablesItems', sustanableSchema);

module.exports = SustainablesItems;