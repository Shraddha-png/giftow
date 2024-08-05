const express = require('express');
const router = express.Router();
const Best_Seller_Review = require('../reviews Model/bestSellerRevModel');
const Best_Seller = require('../models/best_sellerModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, best_sellerId } = req.body;

    try {
        const best_seller = await Best_Seller.findById(best_sellerId);
        if (!best_seller) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Best_Seller_Review({
            rating: Number(rating),
            title,
            comment,
            best_seller: best_sellerId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        best_seller.bestSelreviews.push(createdReview._id);
        best_seller.numReviews = best_seller.bestSelreviews.length;

        // Save the updated product
        await best_seller.save();

        // Fetch the updated product with populated reviews
        const updatedBest_Seller = await Best_Seller.findById(best_sellerId).populate('bestSelreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedBest_Seller.bestSelreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedBest_Seller.rating = newRating;
        await updatedBest_Seller.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
