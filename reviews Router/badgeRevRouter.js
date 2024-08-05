const express = require('express');
const router = express.Router();
const Badge_Review = require('../reviews Model/badgeRevModel');
const Badge = require('../models/badgesModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, badgeId } = req.body;

    try {
        const badge = await Badge.findById(badgeId);
        if (!badge) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Badge_Review({
            rating: Number(rating),
            title,
            comment,
            badge: badgeId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        badge.breviews.push(createdReview._id);
        badge.numReviews = badge.breviews.length;

        // Save the updated product
        await badge.save();

        // Fetch the updated product with populated reviews
        const updatedBadge = await Badge.findById(badgeId).populate('breviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedBadge.breviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedBadge.rating = newRating;
        await updatedBadge.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
