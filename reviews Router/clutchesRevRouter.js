const express = require('express');
const router = express.Router();
const Clutches_Review = require('../reviews Model/clutchesRevModel');
const Clutches = require('../models/clutchesModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, clutcheId } = req.body;

    try {
        const clutche = await Clutches.findById(clutcheId);
        if (!clutche) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Clutches_Review({
            rating: Number(rating),
            title,
            comment,
            clutche: clutcheId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        clutche.clutchesreviews.push(createdReview._id);
        clutche.numReviews = clutche.clutchesreviews.length;

        // Save the updated product
        await clutche.save();

        // Fetch the updated product with populated reviews
        const updatedClutches = await Clutches.findById(clutcheId).populate('clutchesreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedClutches.clutchesreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedClutches.rating = newRating;
        await updatedClutches.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
