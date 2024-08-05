const express = require('express');
const router = express.Router();
const GlassTumb_Review = require('../reviews Model/glasstumbRevModel');
const GlassTumb = require('../models/glasstumbModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, glasstumblerId } = req.body;

    try {
        const glasstumbler = await GlassTumb.findById(glasstumblerId);
        if (!glasstumbler) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new GlassTumb_Review({
            rating: Number(rating),
            title,
            comment,
            glasstumbler: glasstumblerId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        glasstumbler.glasstumbreviews.push(createdReview._id);
        glasstumbler.numReviews = glasstumbler.glasstumbreviews.length;

        // Save the updated product
        await glasstumbler.save();

        // Fetch the updated product with populated reviews
        const updatedGlassTumb = await GlassTumb.findById(glasstumblerId).populate('glasstumbreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedGlassTumb.glasstumbreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedGlassTumb.rating = newRating;
        await updatedGlassTumb.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
