const mongoose = require('mongoose');

const pendriveSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        price1: { type: Number, required: true },
        price2: { type: Number, required: true },
        price3: { type: Number, required: true },
        variety1:{type: String, required: true},
        variety2:{type: String, required: true},
        variety3:{type: String, required: true},
        code:{type: String, required: true},
        description: { type: String, required: true },
        pendrivereviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pendrive_Review' }],
        rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
        numReviews: { type: Number, default: 0, required: true },
    },
    {
        timestamps: true
    }
);

const Pendrive = mongoose.model('Pendrive', pendriveSchema);

module.exports = Pendrive;