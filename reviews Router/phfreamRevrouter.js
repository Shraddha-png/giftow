const express = require('express');
const router = express.Router();
const Photo_Frame_Review = require('../reviews Model/photoFramRevModel');
const Photo_Frame = require('../models/photo_frameModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, photoframeId } = req.body;

    try {
        const photoframe = await Photo_Frame.findById(photoframeId);
        if (!photoframe) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Photo_Frame_Review({
            rating: Number(rating),
            title,
            comment,
            photoframe: photoframeId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        photoframe.phframereviews.push(createdReview._id);
        photoframe.numReviews = photoframe.phframereviews.length;

        // Save the updated product
        await photoframe.save();

        // Fetch the updated product with populated reviews
        const updatedPhoto_Frame = await Photo_Frame.findById(photoframeId).populate('phframereviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedPhoto_Frame.phframereviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedPhoto_Frame.rating = newRating;
        await updatedPhoto_Frame.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
