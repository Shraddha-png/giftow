const express = require('express');
const router = express.Router();
const Brochure_Review = require('../reviews Model/brochureRevModel');
const Brochure = require('../models/brochureModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, brochureId } = req.body;

    try {
        const brochure = await Brochure.findById(brochureId);
        if (!brochure) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Brochure_Review({
            rating: Number(rating),
            title,
            comment,
            brochure: brochureId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        brochure.brochurereviews.push(createdReview._id);
        brochure.numReviews = brochure.brochurereviews.length;

        // Save the updated product
        await brochure.save();

        // Fetch the updated product with populated reviews
        const updatedBrochure = await Brochure.findById(brochureId).populate('brochurereviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedBrochure.brochurereviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedBrochure.rating = newRating;
        await updatedBrochure.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
