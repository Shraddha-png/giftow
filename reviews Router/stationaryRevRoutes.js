const express = require('express');
const router = express.Router();
const Stationerie_Review = require('../reviews Model/stationareRevModel');
const Stationeries = require('../models/stationerieModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, stationerieId } = req.body;

    try {
        const stationerie = await Stationeries.findById(stationerieId);
        if (!stationerie) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Stationerie_Review({
            rating: Number(rating),
            title,
            comment,
            stationerie: stationerieId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        stationerie.stationreviews.push(createdReview._id);
        stationerie.numReviews = stationerie.stationreviews.length;

        // Save the updated product
        await stationerie.save();

        // Fetch the updated product with populated reviews
        const updatedStationeries = await Stationeries.findById(stationerieId).populate('stationreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedStationeries.stationreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedStationeries.rating = newRating;
        await updatedStationeries.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
