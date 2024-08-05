const express = require('express');
const router = express.Router();
const Dombadge_Review = require('../reviews Model/dommgbdgRevModel.js');
const Dombadge = require('../models/dommgbadgeModel.js');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, dommagbadgeId } = req.body;

    try {
        const dommagbadge = await Dombadge.findById(dommagbadgeId);
        if (!dommagbadge) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Dombadge_Review({
            rating: Number(rating),
            title,
            comment,
            dommagbadge: dommagbadgeId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        dommagbadge.dombdgreviews.push(createdReview._id);
        dommagbadge.numReviews = dommagbadge.dombdgreviews.length;

        // Save the updated product
        await dommagbadge.save();

        // Fetch the updated product with populated reviews
        const updatedDombadge = await Dombadge.findById(dommagbadgeId).populate('dombdgreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedDombadge.dombdgreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedDombadge.rating = newRating;
        await updatedDombadge.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
