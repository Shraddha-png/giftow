const express = require('express');
const router = express.Router();
const Chechbook_Cover_Review = require('../reviews Model/checkbook_coverRevModel');
const Chechbook_Cover = require('../models/checkbook_coverModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, checkbook_coverId } = req.body;

    try {
        const checkbook_cover = await Chechbook_Cover.findById(checkbook_coverId);
        if (!checkbook_cover) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Chechbook_Cover_Review({
            rating: Number(rating),
            title,
            comment,
            checkbook_cover: checkbook_coverId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        checkbook_cover.checkbookcoverreviews.push(createdReview._id);
        checkbook_cover.numReviews = checkbook_cover.checkbookcoverreviews.length;

        // Save the updated product
        await checkbook_cover.save();

        // Fetch the updated product with populated reviews
        const updatedChechbook_Cover = await Chechbook_Cover.findById(checkbook_coverId).populate('checkbookcoverreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedChechbook_Cover.checkbookcoverreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedChechbook_Cover.rating = newRating;
        await updatedChechbook_Cover.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
