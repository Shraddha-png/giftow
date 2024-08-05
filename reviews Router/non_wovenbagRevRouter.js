const express = require('express');
const router = express.Router();
const Non_wovenbag_Review = require('../reviews Model/non_wovenbagRevModel');
const Non_wovenbag = require('../models/non_wovenbagModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, non_wovenbagId } = req.body;

    try {
        const non_wovenbag = await Non_wovenbag.findById(non_wovenbagId);
        if (!non_wovenbag) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Non_wovenbag_Review({
            rating: Number(rating),
            title,
            comment,
            non_wovenbag: non_wovenbagId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        non_wovenbag.nonwovenbagreviews.push(createdReview._id);
        non_wovenbag.numReviews = non_wovenbag.nonwovenbagreviews.length;

        // Save the updated product
        await non_wovenbag.save();

        // Fetch the updated product with populated reviews
        const updatedNon_wovenbag = await Non_wovenbag.findById(non_wovenbagId).populate('nonwovenbagreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedNon_wovenbag.nonwovenbagreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedNon_wovenbag.rating = newRating;
        await updatedNon_wovenbag.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
