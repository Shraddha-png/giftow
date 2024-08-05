const express = require('express');
const router = express.Router();
const Digitalph_frame_Review = require('../reviews Model/digitalphFramRevModel');
const Digitalph_frame = require('../models/digitalphframe_Model');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, digitalphframeId } = req.body;

    try {
        const digitalphframe = await Digitalph_frame.findById(digitalphframeId);
        if (!digitalphframe) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Digitalph_frame_Review({
            rating: Number(rating),
            title,
            comment,
            digitalphframe: digitalphframeId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        digitalphframe.digitalphframereviews.push(createdReview._id);
        digitalphframe.numReviews = digitalphframe.digitalphframereviews.length;

        // Save the updated product
        await digitalphframe.save();

        // Fetch the updated product with populated reviews
        const updatedDigitalph_frame = await Digitalph_frame.findById(digitalphframeId).populate('digitalphframereviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedDigitalph_frame.digitalphframereviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedDigitalph_frame.rating = newRating;
        await updatedDigitalph_frame.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
