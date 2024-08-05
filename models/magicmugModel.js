const mongoose = require('mongoose');

const magicmugSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        variety:{type: String, required: true},
        code:{type: String, required: true},
        magicmugreviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Magicmug_Review' }],
        rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
        numReviews: { type: Number, default: 0, required: true },
        description: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

const Magicmug = mongoose.model('Magicmug', magicmugSchema);

module.exports = Magicmug;
