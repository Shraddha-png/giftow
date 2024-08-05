const express = require('express');
const router = express.Router();
const Bag_Review = require('../reviews Model/bagRevModel');
const Bag = require('../models/bagModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, bagId } = req.body;

    try {
        const bag = await Bag.findById(bagId);
        if (!bag) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Bag_Review({
            rating: Number(rating),
            title,
            comment,
            bag: bagId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        bag.bagreviews.push(createdReview._id);
        bag.numReviews = bag.bagreviews.length;

        // Save the updated product
        await bag.save();

        // Fetch the updated product with populated reviews
        const updatedBag = await Bag.findById(bagId).populate('bagreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedBag.bagreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedBag.rating = newRating;
        await updatedBag.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
