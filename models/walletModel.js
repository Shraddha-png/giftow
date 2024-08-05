const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        variety:{type: String, required: true},
        code:{type: String, required: true},
        description: { type: String, required: true },
        walletsreviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Wallet_Review' }],
        rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
        numReviews: { type: Number, default: 0, required: true },

    },
    {
        timestamps: true
    }
);

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;
