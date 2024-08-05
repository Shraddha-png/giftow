const express = require('express');
const router = express.Router();
const Award_Review = require('../reviews Model/awardRevModel');
const Award = require('../models/awardModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, awardId } = req.body;

    try {
        const award = await Award.findById(awardId);
        if (!award) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Award_Review({
            rating: Number(rating),
            title,
            comment,
            award: awardId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        award.areviews.push(createdReview._id);
        award.numReviews = award.areviews.length;

        // Save the updated product
        await award.save();

        // Fetch the updated product with populated reviews
        const updatedAward = await Award.findById(awardId).populate('areviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedAward.areviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedAward.rating = newRating;
        await updatedAward.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
