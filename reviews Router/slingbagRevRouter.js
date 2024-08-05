const express = require('express');
const router = express.Router();
const Slingbag_Review = require('../reviews Model/slingbagRevModel');
const Slingbag = require('../models/slingbagsModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, slingbagId } = req.body;

    try {
        const slingbag = await Slingbag.findById(slingbagId);
        if (!slingbag) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Slingbag_Review({
            rating: Number(rating),
            title,
            comment,
            slingbag: slingbagId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        slingbag.slingbagreviews.push(createdReview._id);
        slingbag.numReviews = slingbag.slingbagreviews.length;

        // Save the updated product
        await slingbag.save();

        // Fetch the updated product with populated reviews
        const updatedSlingbag = await Slingbag.findById(slingbagId).populate('slingbagreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedSlingbag.slingbagreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedSlingbag.rating = newRating;
        await updatedSlingbag.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
