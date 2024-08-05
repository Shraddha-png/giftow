const mongoose = require('mongoose');

const acrynmplateSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        variety:{type: String, required: true},
        code:{type: String, required: true},
        description: { type: String, required: true },
        material: { type: String, required: true },
        acrnmplatereviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Acrynmplate_Review' }],
        rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
        numReviews: { type: Number, default: 0, required: true }, 
    },
    {
        timestamps: true
    }
);
      
const Acrynmplate = mongoose.model('Acrynmplate', acrynmplateSchema);

module.exports = Acrynmplate;

