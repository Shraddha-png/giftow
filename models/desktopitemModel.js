const mongoose = require('mongoose');

const desktopitemSchema = new mongoose.Schema(
    {
        name: { type: String, required: true},
        slug: { type: String, required: true, unique: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        material: { type: String, required: true },
        variety:{type: String, required: true},
        code:{type: String, required: true},
        description: { type: String, required: true }, 
        desktopitemreviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Desktop_Item_Review' }],
        rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
        numReviews: { type: Number, default: 0, required: true },
       
    },
    {
        timestamps: true
    }
);

const Desktop_Item = mongoose.model('Desktop_Item', desktopitemSchema);

module.exports = Desktop_Item;
