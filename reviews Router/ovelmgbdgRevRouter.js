const express = require('express');
const router = express.Router();
const Ovalbadge_Review = require('../reviews Model/ovelbdgRevModel.js');
const Ovalbadge = require('../models/ovalbadgeModel.js');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, ovlmgbadgeId } = req.body;

    try {
        const ovlmgbadge = await Ovalbadge.findById(ovlmgbadgeId);
        if (!ovlmgbadge) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Ovalbadge_Review({
            rating: Number(rating),
            title,
            comment,
            ovlmgbadge: ovlmgbadgeId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        ovlmgbadge.ovelbdgreviews.push(createdReview._id);
        ovlmgbadge.numReviews = ovlmgbadge.ovelbdgreviews.length;

        // Save the updated product
        await ovlmgbadge.save();

        // Fetch the updated product with populated reviews
        const updatedOvalbadge = await Ovalbadge.findById(ovlmgbadgeId).populate('ovelbdgreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedOvalbadge.ovelbdgreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedOvalbadge.rating = newRating;
        await updatedOvalbadge.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
