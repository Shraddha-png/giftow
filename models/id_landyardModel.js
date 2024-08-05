const mongoose = require('mongoose');

const id_landyardSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        variety:{type: String, required: true},
        code:{type: String, required: true},
        description: { type: String, required: true },
        id_laynyardreviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Id_landyard_Review' }],
        rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
        numReviews: { type: Number, default: 0, required: true },
    }, 
    {
        timestamps: true
    }
);

const Id_landyard = mongoose.model('Id_landyard', id_landyardSchema);

module.exports = Id_landyard;

