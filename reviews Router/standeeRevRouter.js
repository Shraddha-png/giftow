const express = require('express');
const router = express.Router();
const Standee_Review = require('../reviews Model/standeeRevModel');
const Standee = require('../models/standeeModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, standeeId } = req.body;

    try {
        const standee = await Standee.findById(standeeId);
        if (!standee) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Standee_Review({
            rating: Number(rating),
            title,
            comment,
            standee: standeeId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        standee.standeereviews.push(createdReview._id);
        standee.numReviews = standee.standeereviews.length;

        // Save the updated product
        await standee.save();

        // Fetch the updated product with populated reviews
        const updatedStandee = await Standee.findById(standeeId).populate('standeereviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedStandee.standeereviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedStandee.rating = newRating;
        await updatedStandee.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
