const mongoose = require('mongoose');

const mugSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        capacity: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        material: { type: String, required: true },
        variety:{type: String, required: true},
        code:{type: String, required: true},
        description: { type: String, required: true },
        mugreviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mug_Review' }],
        rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
        numReviews: { type: Number, default: 0, required: true },

       
    },
    {
        timestamps: true
    }
);

const Mug = mongoose.model('Mug', mugSchema);

module.exports = Mug;

