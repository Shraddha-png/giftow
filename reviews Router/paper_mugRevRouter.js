const express = require('express');
const router = express.Router();
const reviewSchema = require('../reviews Model/papermugRevModel');
const Paper_mug = require('../models/paper_mugModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, paper_mugId } = req.body;

    try {
        const paper_mug = await Paper_mug.findById(paper_mugId);
        if (!paper_mug) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new reviewSchema({
            rating: Number(rating),
            title,
            comment,
            paper_mug: paper_mugId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        paper_mug.pmugreviews.push(createdReview._id);
        paper_mug.numReviews = paper_mug.pmugreviews.length;

        // Save the updated product
        await paper_mug.save();

        // Fetch the updated product with populated reviews
        const updatedPaper_mug = await Paper_mug.findById(paper_mugId).populate('pmugreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedPaper_mug.pmugreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedPaper_mug.rating = newRating;
        await updatedPaper_mug.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
