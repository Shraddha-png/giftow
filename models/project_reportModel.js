const mongoose = require('mongoose');

const project_reportSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        variety:{type: String, required: true},
        code:{type: String, required: true},
        description: { type: String, required: true },
        prorepreviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project_Report_Review' }],
        rating: { type: Number, default: 0, required: true, min: 0, max: 5 },
        numReviews: { type: Number, default: 0, required: true },
    }, 
    {
        timestamps: true
    }
);

const Project_Report = mongoose.model('Project_Report', project_reportSchema);

module.exports = Project_Report;

