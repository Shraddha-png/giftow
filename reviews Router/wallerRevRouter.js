const express = require('express');
const router = express.Router();
const Wallet_Review = require('../reviews Model/wallerRevModel');
const Wallet = require('../models/walletModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, walletId } = req.body;

    try {
        const wallet = await Wallet.findById(walletId);
        if (!wallet) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Wallet_Review({
            rating: Number(rating),
            title,
            comment,
            wallet: walletId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        wallet.walletsreviews.push(createdReview._id);
        wallet.numReviews = wallet.walletsreviews.length;

        // Save the updated product
        await wallet.save();

        // Fetch the updated product with populated reviews
        const updatedWallet = await Wallet.findById(walletId).populate('walletsreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedWallet.walletsreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedWallet.rating = newRating;
        await updatedWallet.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
