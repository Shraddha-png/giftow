const mongoose = require('mongoose');

const couplemugSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        capacity: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        variety:{type: String, required: true},
        code:{type: String, required: true},
        description: { type: String, required: true },
        material: { type: String, required: true },
        cmugreviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Couplemug_Review' }],
        rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
        numReviews: { type: Number, default: 0, required: true },
    },
    {
        timestamps: true
    }
);

const Couplemug = mongoose.model('Couplemug', couplemugSchema);

module.exports = Couplemug;
