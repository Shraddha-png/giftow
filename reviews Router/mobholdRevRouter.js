const express = require('express');
const router = express.Router();
const Mobilehold_Review = require('../reviews Model/mobileholdRevModel');
const Mobilehold = require('../models/mobileholdModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, mobileholdld } = req.body;

    try {
        const mobilehold = await Mobilehold.findById(mobileholdld);
        if (!mobilehold) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Mobilehold_Review({
            rating: Number(rating),
            title,
            comment,
            mobilehold: mobileholdld,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        mobilehold.mobreviews.push(createdReview._id);
        mobilehold.numReviews = mobilehold.mobreviews.length;

        // Save the updated product
        await mobilehold.save();

        // Fetch the updated product with populated reviews
        const updatedmobilehold = await Mobilehold.findById(mobileholdld).populate('mobreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedmobilehold.mobreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedmobilehold.rating = newRating;
        await updatedmobilehold.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
