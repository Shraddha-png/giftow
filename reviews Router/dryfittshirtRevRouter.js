const express = require('express');
const router = express.Router();
const Dry_fit_tshirt_Review = require('../reviews Model/dryfittshirtRevModel');
const Dry_fit_tshirt = require('../models/dry_fit_tshirtModel')
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, dry_fit_tshirtId } = req.body;

    try {
        const dry_fit_tshirt = await Dry_fit_tshirt.findById(dry_fit_tshirtId);
        if (!dry_fit_tshirt) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Dry_fit_tshirt_Review({
            rating: Number(rating),
            title,
            comment,
            dry_fit_tshirt: dry_fit_tshirtId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        dry_fit_tshirt.dryfittishreviews.push(createdReview._id);
        dry_fit_tshirt.numReviews = dry_fit_tshirt.dryfittishreviews.length;

        // Save the updated product
        await dry_fit_tshirt.save();

        // Fetch the updated product with populated reviews
        const updatedDry_fit_tshirt = await Dry_fit_tshirt.findById(dry_fit_tshirtId).populate('dryfittishreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedDry_fit_tshirt.dryfittishreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedDry_fit_tshirt.rating = newRating;
        await updatedDry_fit_tshirt.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
