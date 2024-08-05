const express = require('express');
const router = express.Router();
const Digital_Clock_speaker_Review = require('../reviews Model/digitalClockSpe_RevModel');
const Digital_Clock_speaker = require('../models/digitalclock_speakersModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, digitalclock_speakerId } = req.body;

    try {
        const digitalclock_speaker = await Digital_Clock_speaker.findById(digitalclock_speakerId);
        if (!digitalclock_speaker) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Digital_Clock_speaker_Review({
            rating: Number(rating),
            title,
            comment,
            digitalclock_speaker: digitalclock_speakerId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        digitalclock_speaker.digitalclocspeareviews.push(createdReview._id);
        digitalclock_speaker.numReviews = digitalclock_speaker.digitalclocspeareviews.length;

        // Save the updated product
        await digitalclock_speaker.save();

        // Fetch the updated product with populated reviews
        const updatedDigital_Clock_speaker = await Digital_Clock_speaker.findById(digitalclock_speakerId).populate('digitalclocspeareviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedDigital_Clock_speaker.digitalclocspeareviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedDigital_Clock_speaker.rating = newRating;
        await updatedDigital_Clock_speaker.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
