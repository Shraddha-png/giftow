const express = require('express');
const router = express.Router();
const Magnifire_Review = require('../reviews Model/magnifireRevModel');
const Magnifire = require('../models/magnifiresModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, magnifireId } = req.body;

    try {
        const magnifire = await Magnifire.findById(magnifireId);
        if (!magnifire) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Magnifire_Review({
            rating: Number(rating),
            title,
            comment,
            magnifire: magnifireId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        magnifire.magnifirereviews.push(createdReview._id);
        magnifire.numReviews = magnifire.magnifirereviews.length;

        // Save the updated product
        await magnifire.save();

        // Fetch the updated product with populated reviews
        const updatedMagnifire = await Magnifire.findById(magnifireId).populate('magnifirereviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedMagnifire.magnifirereviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedMagnifire.rating = newRating;
        await updatedMagnifire.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
