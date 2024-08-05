const express = require('express');
const router = express.Router();
const TrainingMannual_Review = require('../reviews Model/TrainingMannual_ReviewModel');
const TrainingMannual = require('../models/training_mannualModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, training_mannualId } = req.body;

    try {
        const training_mannual = await TrainingMannual.findById(training_mannualId);
        if (!training_mannual) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new TrainingMannual_Review({
            rating: Number(rating),
            title,
            comment,
            training_mannual: training_mannualId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        training_mannual.tramanreviews.push(createdReview._id);
        training_mannual.numReviews = training_mannual.tramanreviews.length;

        // Save the updated product
        await training_mannual.save();

        // Fetch the updated product with populated reviews
        const updatedTrainingMannual = await TrainingMannual.findById(training_mannualId).populate('tramanreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedTrainingMannual.tramanreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedTrainingMannual.rating = newRating;
        await updatedTrainingMannual.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
