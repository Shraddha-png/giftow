const express = require('express');
const router = express.Router();
const Card_Holder_Review = require('../reviews Model/cardholRevModel');
const Card_Holder = require('../models/Card_holderModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, card_holderId } = req.body;

    try {
        const card_holder = await Card_Holder.findById(card_holderId);
        if (!card_holder) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Card_Holder_Review({
            rating: Number(rating),
            title,
            comment,
            card_holder: card_holderId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        card_holder.cardholreviews.push(createdReview._id);
        card_holder.numReviews = card_holder.cardholreviews.length;

        // Save the updated product
        await card_holder.save();

        // Fetch the updated product with populated reviews
        const updatedCard_Holder = await Card_Holder.findById(card_holderId).populate('cardholreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedCard_Holder.cardholreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedCard_Holder.rating = newRating;
        await updatedCard_Holder.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
