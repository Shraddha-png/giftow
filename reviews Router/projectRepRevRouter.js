const express = require('express');
const router = express.Router();
const Project_Report_Review = require('../reviews Model/projectRepRevModel');
const Project_Report = require('../models/project_reportModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, project_reportId } = req.body;

    try {
        const project_report = await Project_Report.findById(project_reportId);
        if (!project_report) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Project_Report_Review({
            rating: Number(rating),
            title,
            comment,
            project_report: project_reportId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        project_report.prorepreviews.push(createdReview._id);
        project_report.numReviews = project_report.prorepreviews.length;

        // Save the updated product
        await project_report.save();

        // Fetch the updated product with populated reviews
        const updatedProject_Report = await Project_Report.findById(project_reportId).populate('prorepreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedProject_Report.prorepreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedProject_Report.rating = newRating;
        await updatedProject_Report.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
