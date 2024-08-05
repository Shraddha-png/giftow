const mongoose = require('mongoose');

const photo_frameSchema = new mongoose.Schema(
    {
        name: { type: String, required: true},
        slug: { type: String, required: true, unique: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true }, 
        variety:{type: String, required: true},
        code:{type: String, required: true},
        phframereviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Photo_Frame_Review' }],
        rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
        numReviews: { type: Number, default: 0, required: true },
       
    },
    {
        timestamps: true
    }
);

const Photo_Frame = mongoose.model('Photo_Frame', photo_frameSchema);

module.exports = Photo_Frame;
