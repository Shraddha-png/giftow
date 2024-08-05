
const express = require('express');
const router = express.Router();
const Totebag_Review = require('../reviews Model/totebagRevModel');
const Totebag = require('../models/totebagModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, totebagId } = req.body;

    try {
        const totebag = await Totebag.findById(totebagId);
        if (!totebag) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Totebag_Review({
            rating: Number(rating), 
            title,
            comment,
            totebag: totebagId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        totebag.totebagreviews.push(createdReview._id);
        totebag.numReviews = totebag.totebagreviews.length;

        // Save the updated product
        await totebag.save();

        // Fetch the updated product with populated reviews
        const updatedTotebag = await Totebag.findById(totebagId).populate('totebagreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedTotebag.totebagreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedTotebag.rating = newRating;
        await updatedTotebag.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
