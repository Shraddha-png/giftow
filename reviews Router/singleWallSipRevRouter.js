const express = require('express');
const router = express.Router();
const Singleawllsipper_Review = require('../reviews Model/singleWallsipRevModel');
const Singleawllsipper = require('../models/single_wall_sipperModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, singlwallsipperId } = req.body;

    try {
        const singlwallsipper = await Singleawllsipper.findById(singlwallsipperId);
        if (!singlwallsipper) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Singleawllsipper_Review({
            rating: Number(rating),
            title,
            comment,
            singlwallsipper: singlwallsipperId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        singlwallsipper.singlwallsipreviews.push(createdReview._id);
        singlwallsipper.numReviews = singlwallsipper.singlwallsipreviews.length;

        // Save the updated product
        await singlwallsipper.save();

        // Fetch the updated product with populated reviews
        const updatedSingleawllsipper = await Singleawllsipper.findById(singlwallsipperId).populate('singlwallsipreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedSingleawllsipper.singlwallsipreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedSingleawllsipper.rating = newRating;
        await updatedSingleawllsipper.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
