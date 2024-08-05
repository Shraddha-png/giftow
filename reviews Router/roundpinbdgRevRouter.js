const express = require('express');
const router = express.Router();
const Roundpinbadge_Review = require('../reviews Model/roundpinbdgRevModel.js');
const Roundpinbadge = require('../models/roundpinbadgeModel.js');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, roundpinbadgeId } = req.body;

    try {
        const roundpinbadge = await Roundpinbadge.findById(roundpinbadgeId);
        if (!roundpinbadge) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Roundpinbadge_Review({
            rating: Number(rating),
            title,
            comment,
            roundpinbadge: roundpinbadgeId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        roundpinbadge.roundpinbdgreviews.push(createdReview._id);
        roundpinbadge.numReviews = roundpinbadge.roundpinbdgreviews.length;

        // Save the updated product
        await roundpinbadge.save();

        // Fetch the updated product with populated reviews
        const updatedRoundpinbadge = await Roundpinbadge.findById(roundpinbadgeId).populate('roundpinbdgreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedRoundpinbadge.roundpinbdgreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedRoundpinbadge.rating = newRating;
        await updatedRoundpinbadge.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
