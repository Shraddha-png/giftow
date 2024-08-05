const express = require('express');
const router = express.Router();
const Pencil_Review = require('../reviews Model/pencilRevModel');
const Pencil = require('../models/pencilModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, pencilId } = req.body;

    try {
        const pencil = await Pencil.findById(pencilId);
        if (!pencil) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Pencil_Review({
            rating: Number(rating),
            title,
            comment,
            pencil: pencilId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        pencil.pencilreviews.push(createdReview._id);
        pencil.numReviews = pencil.pencilreviews.length;

        // Save the updated product
        await pencil.save();

        // Fetch the updated product with populated reviews
        const updatedPencil = await Pencil.findById(pencilId).populate('pencilreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedPencil.pencilreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedPencil.rating = newRating;
        await updatedPencil.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
