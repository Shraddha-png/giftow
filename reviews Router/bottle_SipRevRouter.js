const express = require('express');
const router = express.Router();
const Bottle_sipper_Review = require('../reviews Model/bottle_SipRevModel');
const Bottle_sipper = require('../models/bottle_sippersModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, bottle_sipperId } = req.body;

    try {
        const bottle_sipper = await Bottle_sipper.findById(bottle_sipperId);
        if (!bottle_sipper) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Bottle_sipper_Review({
            rating: Number(rating),
            title,
            comment,
            bottle_sipper: bottle_sipperId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        bottle_sipper.bottle_Sipreviews.push(createdReview._id);
        bottle_sipper.numReviews = bottle_sipper.bottle_Sipreviews.length;

        // Save the updated product
        await bottle_sipper.save();

        // Fetch the updated product with populated reviews
        const updatedBottle_sipper = await Bottle_sipper.findById(bottle_sipperId).populate('bottle_Sipreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedBottle_sipper.bottle_Sipreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedBottle_sipper.rating = newRating;
        await updatedBottle_sipper.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
