const express = require('express');
const router = express.Router();
const HotColdSip_Review = require('../reviews Model/hotcold_sipRevModel');
const Hotcoldsipper = require('../models/hotcoldsipperModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, hotcoldsipperId } = req.body;

    try {
        const hotcoldsipper = await Hotcoldsipper.findById(hotcoldsipperId);
        if (!hotcoldsipper) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new HotColdSip_Review({
            rating: Number(rating),
            title,
            comment,
            hotcoldsipper: hotcoldsipperId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        hotcoldsipper.hotcoldsip_reviews.push(createdReview._id);
        hotcoldsipper.numReviews = hotcoldsipper.hotcoldsip_reviews.length;

        // Save the updated product
        await hotcoldsipper.save();

        // Fetch the updated product with populated reviews
        const updatedHotcoldsipper = await Hotcoldsipper.findById(hotcoldsipperId).populate('hotcoldsip_reviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedHotcoldsipper.hotcoldsip_reviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedHotcoldsipper.rating = newRating;
        await updatedHotcoldsipper.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
