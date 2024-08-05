const express = require('express');
const router = express.Router();
const Rubikcubs_Review = require('../reviews Model/rubikcubeRevModel');
const Rubikcubs = require('../models/rubikcubeModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, rubikcubId } = req.body;

    try {
        const rubikcub = await Rubikcubs.findById(rubikcubId);
        if (!rubikcub) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Rubikcubs_Review({
            rating: Number(rating),
            title,
            comment,
            rubikcub: rubikcubId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        rubikcub.cubereviews.push(createdReview._id);
        rubikcub.numReviews = rubikcub.cubereviews.length;

        // Save the updated product
        await rubikcub.save();

        // Fetch the updated product with populated reviews
        const updatedRubikcubs = await Rubikcubs.findById(rubikcubId).populate('cubereviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedRubikcubs.cubereviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedRubikcubs.rating = newRating;
        await updatedRubikcubs.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
