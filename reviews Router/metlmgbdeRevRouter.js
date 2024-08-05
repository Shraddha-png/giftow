const express = require('express');
const router = express.Router();
const Metalmgbadge_Review = require('../reviews Model/metlmgbgeRevModel.js');
const Metalmgbadge = require('../models/metalmgbadgeModel.js');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, metnamebadgeId } = req.body;

    try {
        const metnamebadge = await Metalmgbadge.findById(metnamebadgeId);
        if (!metnamebadge) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Metalmgbadge_Review({
            rating: Number(rating),
            title,
            comment,
            metnamebadge: metnamebadgeId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        metnamebadge.metlmgbdgreviews.push(createdReview._id);
        metnamebadge.numReviews = metnamebadge.metlmgbdgreviews.length;

        // Save the updated product
        await metnamebadge.save();

        // Fetch the updated product with populated reviews
        const updatedMetalmgbadge = await Metalmgbadge.findById(metnamebadgeId).populate('metlmgbdgreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedMetalmgbadge.metlmgbdgreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedMetalmgbadge.rating = newRating;
        await updatedMetalmgbadge.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
