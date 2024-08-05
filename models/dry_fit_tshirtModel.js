
const mongoose = require('mongoose');

const dryfit_tshirtSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        variety:{type: String, required: true},
        code:{type: String, required: true},
        description: { type: String, required: true },
        dryfittishreviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dry_fit_tshirt_Review' }],
        rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
        numReviews: { type: Number, default: 0, required: true },
        
    },
    {
        timestamps: true
    }
);

const Dry_fit_tshirt= mongoose.model('Dry_fit_tshirt', dryfit_tshirtSchema);

module.exports = Dry_fit_tshirt;
