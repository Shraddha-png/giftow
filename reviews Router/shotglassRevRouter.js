const express = require('express');
const router = express.Router();
const Shotglass_Review = require('../reviews Model/shotglassesRevModel');
const Shotglass = require('../models/shotglassesModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, shotglassId } = req.body;

    try {
        const shotglass = await Shotglass.findById(shotglassId);
        if (!shotglass) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Shotglass_Review({
            rating: Number(rating),
            title,
            comment,
            shotglass: shotglassId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        shotglass.shotglassreviews.push(createdReview._id);
        shotglass.numReviews = shotglass.shotglassreviews.length;

        // Save the updated product
        await shotglass.save();

        // Fetch the updated product with populated reviews
        const updateShotglass = await Shotglass.findById(shotglassId).populate('shotglassreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updateShotglass.shotglassreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updateShotglass.rating = newRating;
        await updateShotglass.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
