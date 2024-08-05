const express = require('express');
const router = express.Router();
const Cushion_Review = require('../reviews Model/cushionRevModel');
const Cushion = require('../models/cushionModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, cushionId } = req.body;

    try {
        const cushion = await Cushion.findById(cushionId);
        if (!cushion) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Cushion_Review({
            rating: Number(rating),
            title,
            comment,
            cushion: cushionId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        cushion.cushionreviews.push(createdReview._id);
        cushion.numReviews = cushion.cushionreviews.length;

        // Save the updated product
        await cushion.save();

        // Fetch the updated product with populated reviews
        const updatedCushion = await Cushion.findById(cushionId).populate('cushionreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedCushion.cushionreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedCushion.rating = newRating;
        await updatedCushion.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
