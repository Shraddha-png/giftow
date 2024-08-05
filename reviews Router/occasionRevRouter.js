const express = require('express');
const router = express.Router();
const Occasion_Review = require('../reviews Model/ocassionRevModel');
const Occasion = require('../models/occasionModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, occasionId } = req.body;

    try {
        const occasion = await Occasion.findById(occasionId);
        if (!occasion) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Occasion_Review({
            rating: Number(rating),
            title,
            comment,
            occasion: occasionId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        occasion.occasionreviews.push(createdReview._id);
        occasion.numReviews = occasion.occasionreviews.length;

        // Save the updated product
        await occasion.save();

        // Fetch the updated product with populated reviews
        const updatedOccasion = await Occasion.findById(occasionId).populate('occasionreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedOccasion.occasionreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedOccasion.rating = newRating;
        await updatedOccasion.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
