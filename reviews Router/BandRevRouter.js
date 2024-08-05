const express = require('express');
const router = express.Router();
const Band_Review = require('../reviews Model/bandRevModel');
const Band = require('../models/bandModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, bandId } = req.body;

    try {
        const band = await Band.findById(bandId);
        if (!band) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Band_Review({
            rating: Number(rating),
            title,
            comment,
            band: bandId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        band.bandreviews.push(createdReview._id);
        band.numReviews = band.bandreviews.length;

        // Save the updated product
        await band.save();

        // Fetch the updated product with populated reviews
        const updatedBand = await Band.findById(bandId).populate('bandreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedBand.bandreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedBand.rating = newRating;
        await updatedBand.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
