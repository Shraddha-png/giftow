const express = require('express');
const router = express.Router();
const Mousepad_Review = require('../reviews Model/mousepadRevModel');
const Mousepad = require('../models/mousepadModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, mousepadId } = req.body;

    try {
        const mousepad = await Mousepad.findById(mousepadId);
        if (!mousepad) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Mousepad_Review({
            rating: Number(rating),
            title,
            comment,
            mousepad: mousepadId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        mousepad.moupadreviews.push(createdReview._id);
        mousepad.numReviews = mousepad.moupadreviews.length;

        // Save the updated product
        await mousepad.save();

        // Fetch the updated product with populated reviews
        const updatedMousepad = await Mousepad.findById(mousepadId).populate('moupadreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedMousepad.moupadreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedMousepad.rating = newRating;
        await updatedMousepad.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
