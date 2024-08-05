const express = require('express');
const router = express.Router();
const Speaker_Review = require('../reviews Model/speakerRevModel');
const Speaker = require('../models/speakerModel');;
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, speakerId } = req.body;

    try {
        const speaker = await Speaker.findById(speakerId);
        if (!speaker) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Speaker_Review({
            rating: Number(rating),
            title,
            comment,
            speaker: speakerId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        speaker.speakerreviews.push(createdReview._id);
        speaker.numReviews = speaker.speakerreviews.length;

        // Save the updated product
        await speaker.save();

        // Fetch the updated product with populated reviews
        const updatedSpeaker = await Speaker.findById(speakerId).populate('speakerreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedSpeaker.speakerreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedSpeaker.rating = newRating;
        await updatedSpeaker.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
