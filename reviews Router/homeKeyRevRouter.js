const express = require('express');
const router = express.Router();
const Home_keychain_Review = require('../reviews Model/homeKeyRevModel');
const Home_keychain = require('../models/home_keychModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, home_keychainId } = req.body;

    try {
        const home_keychain = await Home_keychain.findById(home_keychainId);
        if (!home_keychain) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Home_keychain_Review({
            rating: Number(rating),
            title,
            comment,
            home_keychain: home_keychainId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        home_keychain.homeKeyreviews.push(createdReview._id);
        home_keychain.numReviews = home_keychain.homeKeyreviews.length;

        // Save the updated product
        await home_keychain.save();

        // Fetch the updated product with populated reviews
        const updatedHome_keychain = await Home_keychain.findById(home_keychainId).populate('homeKeyreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedHome_keychain.homeKeyreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedHome_keychain.rating = newRating;
        await updatedHome_keychain.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
