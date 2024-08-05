const express = require('express');
const router = express.Router();
const Cap_Review = require('../reviews Model/capRevModel');
const Cap = require('../models/capModel')
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, capId } = req.body;

    try {
        const cap = await Cap.findById(capId);
        if (!cap) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Cap_Review({
            rating: Number(rating),
            title,
            comment,
            cap: capId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        cap.capreviews.push(createdReview._id);
        cap.numReviews = cap.capreviews.length;

        // Save the updated product
        await cap.save();

        // Fetch the updated product with populated reviews
        const updatedCap = await Cap.findById(capId).populate('capreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedCap.capreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedCap.rating = newRating;
        await updatedCap.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
