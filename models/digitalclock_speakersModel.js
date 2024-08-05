const mongoose = require('mongoose');

const digitalclock_speakerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        variety:{type: String, required: true},
        code:{type: String, required: true},
        description: { type: String, required: true },
        category: { type: String, required: true },
        digitalclocspeareviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Digital_Clock_speaker_Review' }],
        rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
        numReviews: { type: Number, default: 0, required: true },
    },
    {
        timestamps: true
    }
);

const Digital_Clock_speaker = mongoose.model('Digital_Clock_speaker', digitalclock_speakerSchema);

module.exports = Digital_Clock_speaker;
