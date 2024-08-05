const express = require('express');
const router = express.Router();
const Clothing_Review = require('../reviews Model/clothingRevModel.js');
const Clothing = require('../models/clothingModel.js');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, clothingId } = req.body;

    try {
        const clothing = await Clothing.findById(clothingId);
        if (!clothing) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Clothing_Review({
            rating: Number(rating),
            title,
            comment,
            clothing: clothingId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        clothing.clothreviews.push(createdReview._id);
        clothing.numReviews = clothing.clothreviews.length;

        // Save the updated product
        await clothing.save();

        // Fetch the updated product with populated reviews
        const updatedClothing = await Clothing.findById(clothingId).populate('clothreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedClothing.clothreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedClothing.rating = newRating;
        await updatedClothing.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
