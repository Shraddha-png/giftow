const mongoose = require('mongoose');

const nonwovenbagSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        variety:{type: String, required: true},
        code:{type: String, required: true},
        description: { type: String, required: true },
        nonwovenbagreviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Non_wovenbag_Review' }],
        rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
        numReviews: { type: Number, default: 0, required: true },

        
    },
    {
        timestamps: true
    }
);

const Non_wovenbag = mongoose.model('Non_wovenbag', nonwovenbagSchema);

module.exports = Non_wovenbag;

