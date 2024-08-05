const express = require('express');
const router = express.Router();
const LunchBox_Review = require('../reviews Model/lunchboxRevModel');
const LunchBox = require('../models/lunch_boxModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, lunchBoxeId } = req.body;

    try {
        const lunchBoxe = await LunchBox.findById(lunchBoxeId);
        if (!lunchBoxe) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new LunchBox_Review({
            rating: Number(rating),
            title,
            comment,
            lunchBoxe: lunchBoxeId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        lunchBoxe.lunchBoxreviews.push(createdReview._id);
        lunchBoxe.numReviews = lunchBoxe.lunchBoxreviews.length;

        // Save the updated product
        await lunchBoxe.save();

        // Fetch the updated product with populated reviews
        const updatedLunchBox = await LunchBox.findById(lunchBoxeId).populate('lunchBoxreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedLunchBox.lunchBoxreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedLunchBox.rating = newRating;
        await updatedLunchBox.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
