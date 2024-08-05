const mongoose = require('mongoose');

const document_printingSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        variety:{type: String, required: true},
        code:{type: String, required: true},
        description: { type: String, required: true },
        docprireviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document_printing_Review' }],
        rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
        numReviews: { type: Number, default: 0, required: true },

    }, 
    {
        timestamps: true
    }
);

const Document_printing = mongoose.model('Document_printing', document_printingSchema);

module.exports = Document_printing;

