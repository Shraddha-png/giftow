const express = require('express');
const router = express.Router();
const Headphone_Review = require('../reviews Model/headphoneRevModel');
const Headphone = require('../models/headphoneModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, headphoneId } = req.body;

    try {
        const headphone = await Headphone.findById(headphoneId);
        if (!headphone) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Headphone_Review({
            rating: Number(rating),
            title,
            comment,
            headphone: headphoneId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        headphone.headphonereviews.push(createdReview._id);
        headphone.numReviews = headphone.headphonereviews.length;

        // Save the updated product
        await headphone.save();

        // Fetch the updated product with populated reviews
        const updatedHeadphone = await Headphone.findById(headphoneId).populate('headphonereviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedHeadphone.headphonereviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedHeadphone.rating = newRating;
        await updatedHeadphone.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
