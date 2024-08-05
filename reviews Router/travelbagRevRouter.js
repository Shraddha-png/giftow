const express = require('express');
const router = express.Router();
const Travelbag_Review = require('../reviews Model/travelbagRevModel');
const Travelbag = require('../models/travelbagModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, travelbagId } = req.body;

    try {
        const travelbag = await Travelbag.findById(travelbagId);
        if (!travelbag) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Travelbag_Review({
            rating: Number(rating),
            title,
            comment,
            travelbag: travelbagId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        travelbag.travelbagreviews.push(createdReview._id);
        travelbag.numReviews = travelbag.travelbagreviews.length;

        // Save the updated product
        await travelbag.save();

        // Fetch the updated product with populated reviews
        const updatedTravelbag = await Travelbag.findById(travelbagId).populate('travelbagreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedTravelbag.travelbagreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedTravelbag.rating = newRating;
        await updatedTravelbag.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
