const mongoose = require('mongoose');

const bottle_sipperSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        category: { type: String, required: true },
        material: { type: String, required: true },
        capacity: { type: String, required: true },
        variety1:{type: String, required: true},
        variety2:{type: String, required: true},
        variety3:{type: String, required: true},
        variety4:{type: String, required: true},
        code:{type: String, required: true},
        description: { type: String, required: true },
        bottle_Sipreviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bottle_sipper_Review' }],
        rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
        numReviews: { type: Number, default: 0, required: true },
    },
    {
        timestamps: true
    }
);

const Bottle_sipper = mongoose.model('Bottle_sipper', bottle_sipperSchema);

module.exports = Bottle_sipper;
