const express = require('express');
const router = express.Router();
const Clipnamebadge_Review = require('../reviews Model/clipplabgeRevModel.js');
const Clipnamebadge = require('../models/clipbadgeModel.js');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, clipplabadgeId } = req.body;

    try {
        const clipplabadge = await Clipnamebadge.findById(clipplabadgeId);
        if (!clipplabadge) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Clipnamebadge_Review({
            rating: Number(rating),
            title,
            comment,
            clipplabadge: clipplabadgeId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        clipplabadge.clipplabdgreviews.push(createdReview._id);
        clipplabadge.numReviews = clipplabadge.clipplabdgreviews.length;

        // Save the updated product
        await clipplabadge.save();

        // Fetch the updated product with populated reviews
        const updatedClipnamebadge = await Clipnamebadge.findById(clipplabadgeId).populate('clipplabdgreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedClipnamebadge.clipplabdgreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedClipnamebadge.rating = newRating;
        await updatedClipnamebadge.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
