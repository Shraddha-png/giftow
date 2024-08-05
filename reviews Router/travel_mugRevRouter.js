const express = require('express');
const router = express.Router();
const Travelmug_Review = require('../reviews Model/travel_mugRevModel');
const Travelmug = require('../models/travelmugModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, travelmugId } = req.body;

    try {
        const travelmug = await Travelmug.findById(travelmugId);
        if (!travelmug) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Travelmug_Review({
            rating: Number(rating),
            title,
            comment,
            travelmug: travelmugId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        travelmug.Trmugreviews.push(createdReview._id);
        travelmug.numReviews = travelmug.Trmugreviews.length;

        // Save the updated product
        await travelmug.save();

        // Fetch the updated product with populated reviews
        const updatedTravelmug = await Travelmug.findById(travelmugId).populate('Trmugreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedTravelmug.Trmugreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedTravelmug.rating = newRating;
        await updatedTravelmug.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
