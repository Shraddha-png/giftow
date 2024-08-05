const express = require('express');
const router = express.Router();
const Pendrive_Review = require('../reviews Model/pendriveRevModel');
const Pendrive = require('../models/pendriveModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, pendriveId } = req.body;

    try {
        const pendrive = await Pendrive.findById(pendriveId);
        if (!pendrive) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Pendrive_Review({
            rating: Number(rating),
            title,
            comment,
            pendrive: pendriveId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        pendrive.pendrivereviews.push(createdReview._id);
        pendrive.numReviews = pendrive.pendrivereviews.length;

        // Save the updated product
        await pendrive.save();

        // Fetch the updated product with populated reviews
        const updatedPendrive = await Pendrive.findById(pendriveId).populate('pendrivereviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedPendrive.pendrivereviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedPendrive.rating = newRating;
        await updatedPendrive.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
