const express = require('express');
const router = express.Router();
const Speaker_stand_Review = require('../reviews Model/spekStandRevModel');
const Speaker_stand = require('../models/speaker_standModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, speaker_standId } = req.body;

    try {
        const speaker_stand = await Speaker_stand.findById(speaker_standId);
        if (!speaker_stand) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Speaker_stand_Review({
            rating: Number(rating),
            title,
            comment,
            speaker_stand: speaker_standId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        speaker_stand.spekstandreviews.push(createdReview._id);
        speaker_stand.numReviews = speaker_stand.spekstandreviews.length;

        // Save the updated product
        await speaker_stand.save();

        // Fetch the updated product with populated reviews
        const updatedSpeaker_stand = await Speaker_stand.findById(speaker_standId).populate('spekstandreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedSpeaker_stand.spekstandreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedSpeaker_stand.rating = newRating;
        await updatedSpeaker_stand.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
