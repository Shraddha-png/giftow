const express = require('express');
const router = express.Router();
const Diary_Review = require('../reviews Model/diaryRevModel');
const Diary = require('../models/diaryModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, diaryId } = req.body;

    try {
        const diary = await Diary.findById(diaryId);
        if (!diary) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Diary_Review({
            rating: Number(rating),
            title,
            comment,
            diary: diaryId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        diary.direviews.push(createdReview._id);
        diary.numReviews = diary.direviews.length;

        // Save the updated product
        await diary.save();

        // Fetch the updated product with populated reviews
        const updatedDiary = await Diary.findById(diaryId).populate('direviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedDiary.direviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedDiary.rating = newRating;
        await updatedDiary.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
