const express = require('express');
const router = express.Router();
const Frostedmug_Review = require('../reviews Model/frosted_mugRevModel');
const FrostedMug = require('../models/frostedMugsModel.js')
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, frostedMugId } = req.body;

    try {
        const frostedMug = await FrostedMug.findById(frostedMugId);
        if (!frostedMug) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Frostedmug_Review({
            rating: Number(rating),
            title,
            comment,
            frostedMug: frostedMugId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        frostedMug.fmreviews.push(createdReview._id);
        frostedMug.numReviews = frostedMug.fmreviews.length;

        // Save the updated product
        await frostedMug.save();

        // Fetch the updated product with populated reviews
        const updatedFrostedMug = await FrostedMug.findById(frostedMugId).populate('fmreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedFrostedMug.fmreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedFrostedMug.rating = newRating;
        await updatedFrostedMug.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
