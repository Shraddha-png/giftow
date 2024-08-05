const mongoose = require('mongoose');

const mousekeySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        variety:{type: String, required: true},
        code:{type: String, required: true},
        category: { type: String, required: true },
        description: { type: String, required: true },
        mouskeyreviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mouse_Key_Review' }],
        rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
        numReviews: { type: Number, default: 0, required: true },

    },
    {
        timestamps: true
    }
);

const Mouse_Key = mongoose.model('Mouse_Key', mousekeySchema);

module.exports = Mouse_Key;
