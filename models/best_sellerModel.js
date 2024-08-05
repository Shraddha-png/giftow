const mongoose = require('mongoose');

const best_sellerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        variety:{type: String, required: true},
        code:{type: String, required: true},
        bestSelreviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Best_Seller_Review' }],
        rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
        numReviews: { type: Number, default: 0, required: true },

    },
    {
        timestamps: true
    }
);

const Best_Seller = mongoose.model('Best_Seller', best_sellerSchema);

module.exports = Best_Seller;
