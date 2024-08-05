const express = require('express');
const router = express.Router();
const Card_PenDrive_Review = require('../reviews Model/cardPDRevModel');
const Card_PenDrive = require('../models/card_pen_driveModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, cardpendriveId } = req.body;

    try {
        const cardpendrive = await Card_PenDrive.findById(cardpendriveId);
        if (!cardpendrive) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Card_PenDrive_Review({
            rating: Number(rating),
            title,
            comment,
            cardpendrive: cardpendriveId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        cardpendrive.cardpdreviews.push(createdReview._id);
        cardpendrive.numReviews = cardpendrive.cardpdreviews.length;

        // Save the updated product
        await cardpendrive.save();

        // Fetch the updated product with populated reviews
        const updatedCard_PenDrive = await Card_PenDrive.findById(cardpendriveId).populate('cardpdreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedCard_PenDrive.cardpdreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedCard_PenDrive.rating = newRating;
        await updatedCard_PenDrive.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
