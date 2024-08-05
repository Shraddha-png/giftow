const express = require('express');
const router = express.Router();
const Acrylicbadge_Review = require('../reviews Model/acrylicnmbdgRevModel.js');
const Acrylicbadge = require('../models/acrybadgeModel.js');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, acrynamebadgeId } = req.body;

    try {
        const acrynamebadge = await Acrylicbadge.findById(acrynamebadgeId);
        if (!acrynamebadge) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Acrylicbadge_Review({
            rating: Number(rating),
            title,
            comment,
            acrynamebadge: acrynamebadgeId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        acrynamebadge.acrnmbgereviews.push(createdReview._id);
        acrynamebadge.numReviews = acrynamebadge.acrnmbgereviews.length;

        // Save the updated product
        await acrynamebadge.save();

        // Fetch the updated product with populated reviews
        const updatedAcrylicbadge = await Acrylicbadge.findById(acrynamebadgeId).populate('acrnmbgereviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedAcrylicbadge.acrnmbgereviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedAcrylicbadge.rating = newRating;
        await updatedAcrylicbadge.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
