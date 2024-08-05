const express = require('express');
const router = express.Router();
const Pen_Review = require('../reviews Model/penRevRouter');
const Pen = require('../models/penModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, penId } = req.body;

    try {
        const pen = await Pen.findById(penId);
        if (!pen) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Pen_Review({
            rating: Number(rating),
            title,
            comment,
            pen: penId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        pen.penreviews.push(createdReview._id);
        pen.numReviews = pen.penreviews.length;

        // Save the updated product
        await pen.save();

        // Fetch the updated product with populated reviews
        const updatedPen = await Pen.findById(penId).populate('penreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedPen.penreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedPen.rating = newRating;
        await updatedPen.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
