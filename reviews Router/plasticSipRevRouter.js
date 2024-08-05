const express = require('express');
const router = express.Router();
const Plasticsipper_Review = require('../reviews Model/plasticSipRevModel');
const Plasticsipper = require('../models/plasticsipperModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, plasticsipperId } = req.body;

    try {
        const plasticsipper = await Plasticsipper.findById(plasticsipperId);
        if (!plasticsipper) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Plasticsipper_Review({
            rating: Number(rating),
            title,
            comment,
            plasticsipper: plasticsipperId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        plasticsipper.plasticsipreviews.push(createdReview._id);
        plasticsipper.numReviews = plasticsipper.plasticsipreviews.length;

        // Save the updated product
        await plasticsipper.save();

        // Fetch the updated product with populated reviews
        const updatedPlasticsipper = await Plasticsipper.findById(plasticsipperId).populate('plasticsipreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedPlasticsipper.plasticsipreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedPlasticsipper.rating = newRating;
        await updatedPlasticsipper.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
