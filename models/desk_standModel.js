const mongoose = require('mongoose');

const desk_standSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        category: { type: String, required: true },
        price: { type: Number, required: true },
        variety:{type: String, required: true},
        code:{type: String, required: true},
        description: { type: String, required: true },
        deskstandreviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Desk_Stand_Review' }],
        rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
        numReviews: { type: Number, default: 0, required: true },
       
    },
    {
        timestamps: true
    }
);

const Desk_Stand = mongoose.model('Desk_Stand', desk_standSchema);

module.exports = Desk_Stand;
