const express = require('express');
const router = express.Router();
const Review = require('../models/reviewModel');
const Product = require('../models/productModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, productId } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Review({
            rating: Number(rating),
            title,
            comment,
            product: productId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        product.reviews.push(createdReview._id);
        product.numReviews = product.reviews.length;

        // Save the updated product
        await product.save();

        // Fetch the updated product with populated reviews
        const updatedProduct = await Product.findById(productId).populate('reviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedProduct.reviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedProduct.rating = newRating;
        await updatedProduct.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
