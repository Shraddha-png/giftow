const express = require('express');
const router = express.Router();
const Pocmgbadge_Review = require('../reviews Model/pockmgbdeRevModel');
const Pocmgbadge = require('../models/pockbadgeModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, pocmagbadgeId } = req.body;

    try {
        const pocmagbadge = await Pocmgbadge.findById(pocmagbadgeId);
        if (!pocmagbadge) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Pocmgbadge_Review({
            rating: Number(rating),
            title,
            comment,
            pocmagbadge: pocmagbadgeId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        pocmagbadge.pockbdgreviews.push(createdReview._id);
        pocmagbadge.numReviews = pocmagbadge.pockbdgreviews.length;

        // Save the updated product
        await pocmagbadge.save();

        // Fetch the updated product with populated reviews
        const updatedPocmgbadge = await Pocmgbadge.findById(pocmagbadgeId).populate('pockbdgreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedPocmgbadge.pockbdgreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedPocmgbadge.rating = newRating;
        await updatedPocmgbadge.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
