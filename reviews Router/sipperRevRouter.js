const express = require('express');
const router = express.Router();
const Sipper_Review = require('../reviews Model/sipperRevModel');
const Sipper = require('../models/sipperModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, sipperId } = req.body;

    try {
        const sipper = await Sipper.findById(sipperId);
        if (!sipper) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Sipper_Review({
            rating: Number(rating),
            title,
            comment,
            sipper: sipperId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        sipper.sipperreviews.push(createdReview._id);
        sipper.numReviews = sipper.sipperreviews.length;

        // Save the updated product
        await sipper.save();

        // Fetch the updated product with populated reviews
        const updatedSipper = await Sipper.findById(sipperId).populate('sipperreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedSipper.sipperreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedSipper.rating = newRating;
        await updatedSipper.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
