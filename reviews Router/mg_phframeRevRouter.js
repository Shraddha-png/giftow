const express = require('express');
const router = express.Router();
const Magnetic_photoframe_Review = require('../reviews Model/mg_phframeRevModel');
const Magnetic_photoframe = require('../models/meg_photo_frameModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, magnetic_photoframeId } = req.body;

    try {
        const magnetic_photoframe = await Magnetic_photoframe.findById(magnetic_photoframeId);
        if (!magnetic_photoframe) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Magnetic_photoframe_Review({
            rating: Number(rating),
            title,
            comment,
            magnetic_photoframe: magnetic_photoframeId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        magnetic_photoframe.mgphframreviews.push(createdReview._id);
        magnetic_photoframe.numReviews = magnetic_photoframe.mgphframreviews.length;

        // Save the updated product
        await magnetic_photoframe.save();

        // Fetch the updated product with populated reviews
        const updatedMagnetic_photoframe = await Magnetic_photoframe.findById(magnetic_photoframeId).populate('mgphframreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedMagnetic_photoframe.mgphframreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedMagnetic_photoframe.rating = newRating;
        await updatedMagnetic_photoframe.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
