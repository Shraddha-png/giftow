const express = require('express');
const router = express.Router();
const Desk_Stand_Review = require('../reviews Model/deskStandRevModel');
const Desk_Stand = require('../models/desk_standModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, desk_standId } = req.body;

    try {
        const desk_stand = await Desk_Stand.findById(desk_standId);
        if (!desk_stand) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Desk_Stand_Review({
            rating: Number(rating),
            title,
            comment,
            desk_stand: desk_standId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        desk_stand.deskstandreviews.push(createdReview._id);
        desk_stand.numReviews = desk_stand.deskstandreviews.length;

        // Save the updated product
        await desk_stand.save();

        // Fetch the updated product with populated reviews
        const updatedDesk_Stand = await Desk_Stand.findById(desk_standId).populate('deskstandreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedDesk_Stand.deskstandreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedDesk_Stand.rating = newRating;
        await updatedDesk_Stand.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
