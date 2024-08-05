const express = require('express');
const router = express.Router();
const Stamp_Review = require('../reviews Model/stampRevModel');
const Stamp = require('../models/stampModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, stampId } = req.body;

    try {
        const stamp = await Stamp.findById(stampId);
        if (!stamp) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Stamp_Review({
            rating: Number(rating),
            title,
            comment,
            stamp: stampId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        stamp.stampreviews.push(createdReview._id);
        stamp.numReviews = stamp.stampreviews.length;

        // Save the updated product
        await stamp.save();

        // Fetch the updated product with populated reviews
        const updatedStamp = await Stamp.findById(stampId).populate('stampreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedStamp.stampreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedStamp.rating = newRating;
        await updatedStamp.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
