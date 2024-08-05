const mongoose = require('mongoose');

const home_keychainSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        variety:{type: String, required: true},
        code:{type: String, required: true},
        description: { type: String, required: true },
        material: { type: String, required: true },
        homeKeyreviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Home_keychain_Review' }],
        rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
        numReviews: { type: Number, default: 0, required: true },
    },
    {
        timestamps: true
    }
);

const Home_keychain = mongoose.model('Home_keychain', home_keychainSchema);

module.exports = Home_keychain;
