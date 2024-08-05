const express = require('express');
const router = express.Router();
const Keychain_Review = require('../reviews Model/keychainRevModel');
const Keychain = require('../models/keychainModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, keychainId } = req.body;

    try {
        const keychain = await Keychain.findById(keychainId);
        if (!keychain) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Keychain_Review({
            rating: Number(rating),
            title,
            comment,
            keychain: keychainId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        keychain.keychainreviews.push(createdReview._id);
        keychain.numReviews = keychain.keychainreviews.length;

        // Save the updated product
        await keychain.save();

        // Fetch the updated product with populated reviews
        const updatedKeychain = await Keychain.findById(keychainId).populate('keychainreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedKeychain.keychainreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedKeychain.rating = newRating;
        await updatedKeychain.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
