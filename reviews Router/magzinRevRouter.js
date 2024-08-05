const express = require('express');
const router = express.Router();
const Magzine_Review = require('../reviews Model/magxineRevModel');
const Magzine = require('../models/magzineModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, magzineId } = req.body;

    try {
        const magzine = await Magzine.findById(magzineId);
        if (!magzine) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Magzine_Review({
            rating: Number(rating),
            title,
            comment,
            magzine: magzineId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        magzine.magzinreviews.push(createdReview._id);
        magzine.numReviews = magzine.magzinreviews.length;

        // Save the updated product
        await magzine.save();

        // Fetch the updated product with populated reviews
        const updatedMagzine = await Magzine.findById(magzineId).populate('magzinreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedMagzine.magzinreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedMagzine.rating = newRating;
        await updatedMagzine.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
