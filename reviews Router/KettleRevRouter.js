// models/reviewModel.js

const express = require('express');
const router = express.Router();
const Kettle_Review = require('../reviews Model/kettleRevModel');
const Kettle = require('../models/kettleModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, kettleId } = req.body;

    try {
        const kettle = await Kettle.findById(kettleId);
        if (!kettle) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Kettle_Review({
            rating: Number(rating),
            title,
            comment,
            kettle: kettleId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        kettle.ktlreviews.push(createdReview._id);
        kettle.numReviews = kettle.ktlreviews.length;

        // Save the updated product
        await kettle.save();

        // Fetch the updated product with populated reviews
        const updatedKettle = await Kettle.findById(kettleId).populate('ktlreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedKettle.ktlreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedKettle.rating = newRating;
        await updatedKettle.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
