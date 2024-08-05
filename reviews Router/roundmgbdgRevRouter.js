const express = require('express');
const router = express.Router();
const Roundmagbadge_Review = require('../reviews Model/roundmgbdgeRevModel');
const Roundmagbadge = require('../models/roundmagbadgeModel.js');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, roundmgbadgeId } = req.body;

    try {
        const roundmgbadge = await Roundmagbadge.findById(roundmgbadgeId);
        if (!roundmgbadge) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Roundmagbadge_Review({
            rating: Number(rating),
            title,
            comment,
            roundmgbadge: roundmgbadgeId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        roundmgbadge.roundmgbadgereviews.push(createdReview._id);
        roundmgbadge.numReviews = roundmgbadge.roundmgbadgereviews.length;

        // Save the updated product
        await roundmgbadge.save();

        // Fetch the updated product with populated reviews
        const updatedRoundmagbadge = await Roundmagbadge.findById(roundmgbadgeId).populate('roundmgbadgereviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedRoundmagbadge.roundmgbadgereviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedRoundmagbadge.rating = newRating;
        await updatedRoundmagbadge.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
