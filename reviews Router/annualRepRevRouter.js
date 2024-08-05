const express = require('express');
const router = express.Router();
const Annual_Report_Review = require('../reviews Model/annualRepRevModel');
const Annual_Report = require('../models/annual_reportModel');

const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, annual_ReportId } = req.body;

    try {
        const annual_Report = await Annual_Report.findById(annual_ReportId);
        if (!annual_Report) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Annual_Report_Review({
            rating: Number(rating),
            title,
            comment,
            annual_Report: annual_ReportId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        annual_Report.annualrepreviews.push(createdReview._id);
        annual_Report.numReviews = annual_Report.annualrepreviews.length;

        // Save the updated product
        await annual_Report.save();

        // Fetch the updated product with populated reviews
        const updatedAnnual_Report = await Annual_Report.findById(annual_ReportId).populate('annualrepreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedAnnual_Report.annualrepreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedAnnual_Report.rating = newRating;
        await updatedAnnual_Report.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
