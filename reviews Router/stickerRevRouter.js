const express = require('express');
const router = express.Router();
const Sticker_Review = require('../reviews Model/stickerRevModel');
const Sticker = require('../models/stickerModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, stickerId } = req.body;

    try {
        const sticker = await Sticker.findById(stickerId);
        if (!sticker) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Sticker_Review({
            rating: Number(rating),
            title,
            comment,
            sticker: stickerId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        sticker.stickerreviews.push(createdReview._id);
        sticker.numReviews = sticker.stickerreviews.length;

        // Save the updated product
        await sticker.save();

        // Fetch the updated product with populated reviews
        const updatedSticker = await Sticker.findById(stickerId).populate('stickerreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedSticker.stickerreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedSticker.rating = newRating;
        await updatedSticker.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
