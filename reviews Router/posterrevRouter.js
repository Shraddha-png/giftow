const express = require('express');
const router = express.Router();
const Poster_Review = require('../reviews Model/posterRevModel');
const Poster = require('../models/posterModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, posterId } = req.body;

    try {
        const poster = await Poster.findById(posterId);
        if (!poster) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Poster_Review({
            rating: Number(rating),
            title,
            comment,
            poster: posterId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        poster.posterreviews.push(createdReview._id);
        poster.numReviews = poster.posterreviews.length;

        // Save the updated product
        await poster.save();

        // Fetch the updated product with populated reviews
        const updatedPoster = await Poster.findById(posterId).populate('posterreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedPoster.posterreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedPoster.rating = newRating;
        await updatedPoster.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
