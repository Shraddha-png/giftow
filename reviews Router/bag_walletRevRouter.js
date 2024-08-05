const express = require('express');
const router = express.Router();
const Bag_Wallet_Review = require('../reviews Model/bag_walletRevModel');
const Bag_Wallet = require('../models/bag_walletsModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, bags_walletId } = req.body;

    try {
        const bags_wallet = await Bag_Wallet.findById(bags_walletId);
        if (!bags_wallet) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Bag_Wallet_Review({
            rating: Number(rating),
            title,
            comment,
            bags_wallet: bags_walletId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        bags_wallet.bagwalletreviews.push(createdReview._id);
        bags_wallet.numReviews = bags_wallet.bagwalletreviews.length;

        // Save the updated product
        await bags_wallet.save();

        // Fetch the updated product with populated reviews
        const updatedBag_Wallet = await Bag_Wallet.findById(bags_walletId).populate('bagwalletreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedBag_Wallet.bagwalletreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedBag_Wallet.rating = newRating;
        await updatedBag_Wallet.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
