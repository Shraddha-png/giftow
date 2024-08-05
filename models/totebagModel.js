const mongoose = require('mongoose');

const totebagSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        category: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        price1: { type: Number, required: true },
        price2: { type: Number, required: true },
        variety1:{type: String, required: true},
        variety2:{type: String, required: true},
        description: { type: String, required: true },
        totebagreviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Totebag_Review' }],
        rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
        numReviews: { type: Number, default: 0, required: true },
        
    },
    {
        timestamps: true
    }
);

const Totebag = mongoose.model('Totebag', totebagSchema);

module.exports = Totebag;
