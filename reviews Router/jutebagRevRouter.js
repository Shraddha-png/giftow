const express = require('express');
const router = express.Router();
const Jutebag_Review = require('../reviews Model/jutebagRevModel');
const Jutebag = require('../models/jutebagModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, jutebagId } = req.body;

    try {
        const jutebag = await Jutebag.findById(jutebagId);
        if (!jutebag) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Jutebag_Review({
            rating: Number(rating),
            title,
            comment,
            jutebag: jutebagId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        jutebag.jutebagreviews.push(createdReview._id);
        jutebag.numReviews = jutebag.jutebagreviews.length;

        // Save the updated product
        await jutebag.save();

        // Fetch the updated product with populated reviews
        const updatedJutebag = await Jutebag.findById(jutebagId).populate('jutebagreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedJutebag.jutebagreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedJutebag.rating = newRating;
        await updatedJutebag.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
