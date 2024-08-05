
const mongoose = require('mongoose');

const fullsleave_tshirtsSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        variety:{type: String, required: true},
        code:{type: String, required: true},
        description: { type: String, required: true },
        fullslvtshirtreviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Fullsleave_tshirt_Review' }],
        rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
        numReviews: { type: Number, default: 0, required: true },
        
    },
    {
        timestamps: true
    }
);

const Fullsleave_tshirt= mongoose.model('Fullsleave_tshirt', fullsleave_tshirtsSchema);

module.exports = Fullsleave_tshirt;
