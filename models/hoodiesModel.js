
const mongoose = require('mongoose');

const hoodieSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        variety1:{type: String, required: true},
        variety2:{type: String, required: true},
        variety3:{type: String, required: true},
        variety4:{type: String, required: true},
        code:{type: String, required: true},
        description: { type: String, required: true },
        hoodiesreviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hoodies_Review' }],
        rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
        numReviews: { type: Number, default: 0, required: true },
        
    },
    {
        timestamps: true
    }
);

const Hoodies= mongoose.model('Hoodies', hoodieSchema);

module.exports = Hoodies;
