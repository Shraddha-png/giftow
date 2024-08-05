const express = require('express');
const router = express.Router();
const Acrylic_photo_frame_Review = require('../reviews Model/acry_phFrameRevModel');
const Acrylic_photo_frame = require('../models/acrylic_photo_frameModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, acrylic_photoprintId } = req.body;

    try {
        const acrylic_photoprint = await Acrylic_photo_frame.findById(acrylic_photoprintId);
        if (!acrylic_photoprint) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Acrylic_photo_frame_Review({
            rating: Number(rating),
            title,
            comment,
            acrylic_photoprint: acrylic_photoprintId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        acrylic_photoprint.acrphframereviews.push(createdReview._id);
        acrylic_photoprint.numReviews = acrylic_photoprint.acrphframereviews.length;

        // Save the updated product
        await acrylic_photoprint.save();

        // Fetch the updated product with populated reviews
        const updatedAcrylic_photo_frame = await Acrylic_photo_frame.findById(acrylic_photoprintId).populate('acrphframereviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedAcrylic_photo_frame.acrphframereviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedAcrylic_photo_frame.rating = newRating;
        await updatedAcrylic_photo_frame.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
