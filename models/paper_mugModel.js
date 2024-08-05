const mongoose = require('mongoose');

const paper_mugSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        material: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        variety:{type: String, required: true},
        code:{type: String, required: true},
        description: { type: String, required: true },
        pmugreviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PaperMug_Review' }],
        rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
        numReviews: { type: Number, default: 0, required: true },

    },
    {
        timestamps: true
    }
);

const Paper_mug = mongoose.model('Paper_mug', paper_mugSchema);

module.exports = Paper_mug;
