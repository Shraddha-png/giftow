const express = require('express');
const router = express.Router();
const Calender_Review = require('../reviews Model/calenderRevModel');
const Calenders = require('../models/calenderModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, calenderId } = req.body;

    try {
        const calender = await Calenders.findById(calenderId);
        if (!calender) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Calender_Review({
            rating: Number(rating),
            title,
            comment,
            calender: calenderId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        calender.calenderreviews.push(createdReview._id);
        calender.numReviews = calender.calenderreviews.length;

        // Save the updated product
        await calender.save();

        // Fetch the updated product with populated reviews
        const updatedCalenders = await Calenders.findById(calenderId).populate('calenderreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedCalenders.calenderreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedCalenders.rating = newRating;
        await updatedCalenders.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
