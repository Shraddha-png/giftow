const express = require('express');
const router = express.Router();
const Bearmug_Review = require('../reviews Model/bearmugRevModel');
const Bearmug = require('../models/bearmugModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, bearmugId } = req.body;

    try {
        const bearmug = await Bearmug.findById(bearmugId);
        if (!bearmug) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Bearmug_Review({
            rating: Number(rating),
            title,
            comment,
            bearmug: bearmugId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        bearmug.bearmugreviews.push(createdReview._id);
        bearmug.numReviews = bearmug.bearmugreviews.length;

        // Save the updated product
        await bearmug.save();

        // Fetch the updated product with populated reviews
        const updatedBearmug = await Bearmug.findById(bearmugId).populate('bearmugreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedBearmug.bearmugreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedBearmug.rating = newRating;
        await updatedBearmug.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
