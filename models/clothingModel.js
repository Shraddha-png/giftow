const mongoose = require('mongoose');

const clothingSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        variety1: { type: String, required: true },
        variety2: { type: String, required: true },
        variety3: { type: String, required: true },
        variety4: { type: String, required: true },
        code: { type: String, required: true },
        price: { type: Number, required: true },
        clothreviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Clothing_Review' }],
        rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
        numReviews: { type: Number, default: 0, required: true },
        
        
        description: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

const Clothing = mongoose.model('Clothing', clothingSchema);

module.exports = Clothing;
