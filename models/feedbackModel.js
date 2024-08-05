const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
    {
        fname: { type: String, required: true },
        lname: { type: String, required: true },
        number: { type: Number, required: true },
        email: { type: String, required: true },
        feedback: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
