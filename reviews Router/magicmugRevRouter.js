const express = require('express');
const router = express.Router();
const Magicmug_Review = require('../reviews Model/magicmugRevModel');
const Magicmug = require('../models/magicmugModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, magicmugId } = req.body;

    try {
        const magicmug = await Magicmug.findById(magicmugId);
        if (!magicmug) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Magicmug_Review({
            rating: Number(rating),
            title,
            comment,
            magicmug: magicmugId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        magicmug.magicmugreviews.push(createdReview._id);
        magicmug.numReviews = magicmug.magicmugreviews.length;

        // Save the updated product
        await magicmug.save();

        // Fetch the updated product with populated reviews
        const updatedMagicmug = await Magicmug.findById(magicmugId).populate('magicmugreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedMagicmug.magicmugreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedMagicmug.rating = newRating;
        await updatedMagicmug.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
