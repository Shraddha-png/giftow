const express = require('express');
const router = express.Router();
const Bamboomug_Review = require('../reviews Model/bamboomugRevModel');
const Bamboomug = require('../models/bambooModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, bomboomugId } = req.body;

    try {
        const bomboomug = await Bamboomug.findById(bomboomugId);
        if (!bomboomug) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Bamboomug_Review({
            rating: Number(rating),
            title,
            comment,
            bomboomug: bomboomugId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        bomboomug.bambo_mugreviews.push(createdReview._id);
        bomboomug.numReviews = bomboomug.bambo_mugreviews.length;

        // Save the updated product
        await bomboomug.save();

        // Fetch the updated product with populated reviews
        const updatedBamboomug = await Bamboomug.findById(bomboomugId).populate('bambo_mugreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedBamboomug.bambo_mugreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedBamboomug.rating = newRating;
        await updatedBamboomug.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
