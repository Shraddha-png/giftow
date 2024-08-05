const mongoose = require('mongoose');

const acrylic_photoframeSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        variety:{type: String, required: true},
        code:{type: String, required: true},
        variety:{type: String, required: true},
        code:{type: String, required: true},
        description: { type: String, required: true },
        acrphframereviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Acrylic_photo_frame_Review' }],
        rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
        numReviews: { type: Number, default: 0, required: true },
        
    },
    {
        timestamps: true
    }
);

const Acrylic_photo_frame = mongoose.model('Acrylic_photo_frame', acrylic_photoframeSchema);

module.exports = Acrylic_photo_frame;
