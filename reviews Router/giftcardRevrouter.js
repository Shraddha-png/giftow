const express = require('express');
const router = express.Router();
const Giftcard_Review = require('../reviews Model/giftcardRevModel');
const Giftcard = require('../models/giftcardmodel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, giftcardId } = req.body;

    try {
        const giftcard = await Giftcard.findById(giftcardId);
        if (!giftcard) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Giftcard_Review({
            rating: Number(rating),
            title,
            comment,
            giftcard: giftcardId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        giftcard.giftcardreviews.push(createdReview._id);
        giftcard.numReviews = giftcard.giftcardreviews.length;

        // Save the updated product
        await giftcard.save();

        // Fetch the updated product with populated reviews
        const updatedGiftcard = await Giftcard.findById(giftcardId).populate('giftcardreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedGiftcard.giftcardreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedGiftcard.rating = newRating;
        await updatedGiftcard.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
