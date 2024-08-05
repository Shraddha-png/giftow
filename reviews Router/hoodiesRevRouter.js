const express = require('express');
const router = express.Router();
const Hoodies_Review = require('../reviews Model/hoodiesRevModel');
const Hoodies = require('../models/hoodiesModel')
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, hoodieId } = req.body;

    try {
        const hoodie = await Hoodies.findById(hoodieId);
        if (!hoodie) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Hoodies_Review({
            rating: Number(rating),
            title,
            comment,
            hoodie: hoodieId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        hoodie.hoodiesreviews.push(createdReview._id);
        hoodie.numReviews = hoodie.hoodiesreviews.length;

        // Save the updated product
        await hoodie.save();

        // Fetch the updated product with populated reviews
        const updatedHoodies = await Hoodies.findById(hoodieId).populate('hoodiesreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedHoodies.hoodiesreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedHoodies.rating = newRating;
        await updatedHoodies.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
