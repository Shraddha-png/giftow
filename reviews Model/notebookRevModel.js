// models/reviewModel.js

const mongoose = require('mongoose');

const notebookSchema = new mongoose.Schema({
    
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },  // Ensure rating is a number
    comment: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Notebook' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
});

const Notebook_Review = mongoose.model('Notebook_Review', notebookSchema);

module.exports = Notebook_Review;
