const express = require('express');
const router = express.Router();
const Wildcraft_Review = require('../reviews Model/wildcraftbagRevModel');
const Wildcraft = require('../models/wildcraftbagModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, wildcraftbagId } = req.body;

    try {
        const wildcraftbag = await Wildcraft.findById(wildcraftbagId);
        if (!wildcraftbag) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Wildcraft_Review({
            rating: Number(rating),
            title,
            comment,
            wildcraftbag: wildcraftbagId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        wildcraftbag.wildcraftbagreviews.push(createdReview._id);
        wildcraftbag.numReviews = wildcraftbag.wildcraftbagreviews.length;

        // Save the updated product
        await wildcraftbag.save();

        // Fetch the updated product with populated reviews
        const updatedWildcraft = await Wildcraft.findById(wildcraftbagId).populate('wildcraftbagreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedWildcraft.wildcraftbagreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedWildcraft.rating = newRating;
        await updatedWildcraft.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
