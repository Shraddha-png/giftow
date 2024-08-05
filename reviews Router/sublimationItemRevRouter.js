const express = require('express');
const router = express.Router();
const Sublimation_item_Review = require('../reviews Model/sublimationItemRevModel');
const Sublimation_item = require('../models/sublimation_itemModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, sublimation_itemId } = req.body;

    try {
        const sublimation_item = await Sublimation_item.findById(sublimation_itemId);
        if (!sublimation_item) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Sublimation_item_Review({
            rating: Number(rating),
            title,
            comment,
            sublimation_item: sublimation_itemId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        sublimation_item.sublimatereviews.push(createdReview._id);
        sublimation_item.numReviews = sublimation_item.sublimatereviews.length;

        // Save the updated product
        await sublimation_item.save();

        // Fetch the updated product with populated reviews
        const updatedSublimation_item = await Sublimation_item.findById(sublimation_itemId).populate('sublimatereviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedSublimation_item.sublimatereviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedSublimation_item.rating = newRating;
        await updatedSublimation_item.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
