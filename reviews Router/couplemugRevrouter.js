const express = require('express');
const router = express.Router();
const Couplemug_Review = require('../reviews Model/couplemugRevModel');
const Couplemug = require('../models/couplemugModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, couplemugId } = req.body;

    try {
        const couplemug = await Couplemug.findById(couplemugId);
        if (!couplemug) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Couplemug_Review({
            rating: Number(rating),
            title,
            comment,
            couplemug: couplemugId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        couplemug.cmugreviews.push(createdReview._id);
        couplemug.numReviews = couplemug.cmugreviews.length;

        // Save the updated product
        await couplemug.save();

        // Fetch the updated product with populated reviews
        const updatedCouplemug = await Couplemug.findById(couplemugId).populate('cmugreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedCouplemug.cmugreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedCouplemug.rating = newRating;
        await updatedCouplemug.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
