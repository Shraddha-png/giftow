const express = require('express');
const router = express.Router();
const Digital_Clock_Review = require('../reviews Model/digital_clockRevModel');
const Digital_Clock = require('../models/digitalclockModels');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, digitalclockId } = req.body;

    try {
        const digitalclock = await Digital_Clock.findById(digitalclockId);
        if (!digitalclock) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Digital_Clock_Review({
            rating: Number(rating),
            title,
            comment,
            digitalclock: digitalclockId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        digitalclock.digitlclockreviews.push(createdReview._id);
        digitalclock.numReviews = digitalclock.digitlclockreviews.length;

        // Save the updated product
        await digitalclock.save();

        // Fetch the updated product with populated reviews
        const updatedDigital_Clock = await Digital_Clock.findById(digitalclockId).populate('digitlclockreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedDigital_Clock.digitlclockreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedDigital_Clock.rating = newRating;
        await updatedDigital_Clock.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
