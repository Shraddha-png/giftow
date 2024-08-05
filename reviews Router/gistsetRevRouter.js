const express = require('express');
const router = express.Router();
const Giftset_Review = require('../reviews Model/giftsetRevModel');
const Giftset = require('../models/giftsetModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, giftsetId } = req.body;

    try {
        const giftset = await Giftset.findById(giftsetId);
        if (!giftset) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Giftset_Review({
            rating: Number(rating),
            title,
            comment,
            giftset: giftsetId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        giftset.giftreviews.push(createdReview._id);
        giftset.numReviews = giftset.giftreviews.length;

        // Save the updated product
        await giftset.save();

        // Fetch the updated product with populated reviews
        const updatedGiftset = await Giftset.findById(giftsetId).populate('giftreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedGiftset.giftreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedGiftset.rating = newRating;
        await updatedGiftset.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
