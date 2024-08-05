const express = require('express');
const router = express.Router();
const Coaster_Review = require('../reviews Model/coasterRevModel');
const Coaster = require('../models/coasterModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, coasterId } = req.body;

    try {
        const coaster = await Coaster.findById(coasterId);
        if (!coaster) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Coaster_Review({
            rating: Number(rating),
            title,
            comment,
            coaster: coasterId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        coaster.coastreviews.push(createdReview._id);
        coaster.numReviews = coaster.coastreviews.length;

        // Save the updated product
        await coaster.save();

        // Fetch the updated product with populated reviews
        const updatedCoaster = await Coaster.findById(coasterId).populate('coastreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedCoaster.coastreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedCoaster.rating = newRating;
        await updatedCoaster.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
