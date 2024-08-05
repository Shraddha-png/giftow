const express = require('express');
const router = express.Router();
const Cushion_covers_Review = require('../reviews Model/cushion_coverRevModel');
const Cushion_covers = require('../models/Cushion_coverModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, cushion_coverId } = req.body;

    try {
        const cushion_cover = await Cushion_covers.findById(cushion_coverId);
        if (!cushion_cover) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Cushion_covers_Review({
            rating: Number(rating),
            title,
            comment,
            cushion_cover: cushion_coverId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        cushion_cover.cushionCoverreviews.push(createdReview._id);
        cushion_cover.numReviews = cushion_cover.cushionCoverreviews.length;

        // Save the updated product
        await cushion_cover.save();

        // Fetch the updated product with populated reviews
        const updatedCushion_covers = await Cushion_covers.findById(cushion_coverId).populate('cushionCoverreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedCushion_covers.cushionCoverreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedCushion_covers.rating = newRating;
        await updatedCushion_covers.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
