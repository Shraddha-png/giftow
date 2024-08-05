const express = require('express');
const router = express.Router();
const Metalnmplate_Review = require('../reviews Model/metlnmplateRevModel');
const Metalnmplate = require('../models/metalnlplatModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, metlnmplateId } = req.body;

    try {
        const metlnmplate = await Metalnmplate.findById(metlnmplateId);
        if (!metlnmplate) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Metalnmplate_Review({
            rating: Number(rating),
            title,
            comment,
            metlnmplate: metlnmplateId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        metlnmplate.metlnmplaetreviews.push(createdReview._id);
        metlnmplate.numReviews = metlnmplate.metlnmplaetreviews.length;

        // Save the updated product
        await metlnmplate.save();

        // Fetch the updated product with populated reviews
        const updatedMetalnmplate = await Metalnmplate.findById(metlnmplateId).populate('metlnmplaetreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedMetalnmplate.metlnmplaetreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedMetalnmplate.rating = newRating;
        await updatedMetalnmplate.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
