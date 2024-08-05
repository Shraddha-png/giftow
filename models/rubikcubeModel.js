const mongoose = require('mongoose');

const rubikcubsSchema = new mongoose.Schema(
    {
        name: { type: String, required: true},
        slug: { type: String, required: true, unique: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        material: { type: String, required: true },
        variety:{type: String, required: true},
        code:{type: String, required: true},
        description: { type: String, required: true }, 
        cubereviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rubikcubs_Review' }],
        rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
        numReviews: { type: Number, default: 0, required: true },
       
    },
    {
        timestamps: true
    }
);

const Rubikcubs = mongoose.model('Rubikcubs', rubikcubsSchema);

module.exports = Rubikcubs;
