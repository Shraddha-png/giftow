const express = require('express');
const router = express.Router();
const Sport_tshirt_Review = require('../reviews Model/sportsTshirtRevModel');
const Sport_tshirt = require('../models/sport_tshirtModel')
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, sports_tshirtId } = req.body;

    try {
        const sports_tshirt = await Sport_tshirt.findById(sports_tshirtId);
        if (!sports_tshirt) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Sport_tshirt_Review({
            rating: Number(rating),
            title,
            comment,
            sports_tshirt: sports_tshirtId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        sports_tshirt.sportstshreviews.push(createdReview._id);
        sports_tshirt.numReviews = sports_tshirt.sportstshreviews.length;

        // Save the updated product
        await sports_tshirt.save();

        // Fetch the updated product with populated reviews
        const updatedSport_tshirt = await Sport_tshirt.findById(sports_tshirtId).populate('sportstshreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedSport_tshirt.sportstshreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedSport_tshirt.rating = newRating;
        await updatedSport_tshirt.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
