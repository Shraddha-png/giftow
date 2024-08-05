const express = require('express');
const router = express.Router();
const Fridge_Magnet_Review = require('../reviews Model/fridgemagRevModel');
const Fridge_Magnet = require('../models/fridge_mgnetModel')
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, fridgeMagnetId } = req.body;

    try {
        const fridgeMagnet = await Fridge_Magnet.findById(fridgeMagnetId);
        if (!fridgeMagnet) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Fridge_Magnet_Review({
            rating: Number(rating),
            title,
            comment,
            fridgeMagnet: fridgeMagnetId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        fridgeMagnet.fridgemagreviews.push(createdReview._id);
        fridgeMagnet.numReviews = fridgeMagnet.fridgemagreviews.length;

        // Save the updated product
        await fridgeMagnet.save();

        // Fetch the updated product with populated reviews
        const updatedFridge_Magnet = await Fridge_Magnet.findById(fridgeMagnetId).populate('fridgemagreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedFridge_Magnet.fridgemagreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedFridge_Magnet.rating = newRating;
        await updatedFridge_Magnet.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
