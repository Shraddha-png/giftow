const mongoose = require('mongoose');

const shotglassesSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        variety:{type: String, required: true},
        code:{type: String, required: true},
        shotglassreviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shotglass_Review' }],
        rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
        numReviews: { type: Number, default: 0, required: true },
        
        description: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

const Shotglass = mongoose.model('Shotglass', shotglassesSchema);

module.exports = Shotglass;
