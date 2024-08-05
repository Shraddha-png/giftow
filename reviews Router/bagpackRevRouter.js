const express = require('express');
const router = express.Router();
const Bagpack_Review = require('../reviews Model/bagpackRevModel');
const Bagpack = require('../models/bagpackModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, bagpackId } = req.body;

    try {
        const bagpack = await Bagpack.findById(bagpackId);
        if (!bagpack) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Bagpack_Review({
            rating: Number(rating),
            title,
            comment,
            bagpack: bagpackId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        bagpack.bagpackreviews.push(createdReview._id);
        bagpack.numReviews = bagpack.bagpackreviews.length;

        // Save the updated product
        await bagpack.save();

        // Fetch the updated product with populated reviews
        const updatedBagpack = await Bagpack.findById(bagpackId).populate('bagpackreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedBagpack.bagpackreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedBagpack.rating = newRating;
        await updatedBagpack.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
