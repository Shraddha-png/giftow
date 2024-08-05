const express = require('express');
const router = express.Router();
const Laptop_skin_Review = require('../reviews Model/laptop_skinRevModel');
const Laptop_skin = require('../models/laptopskinModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, laptop_skinId } = req.body;

    try {
        const laptop_skin = await Laptop_skin.findById(laptop_skinId);
        if (!laptop_skin) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Laptop_skin_Review({
            rating: Number(rating),
            title,
            comment,
            laptop_skin: laptop_skinId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        laptop_skin.laptopSkinreviews.push(createdReview._id);
        laptop_skin.numReviews = laptop_skin.laptopSkinreviews.length;

        // Save the updated product
        await laptop_skin.save();

        // Fetch the updated product with populated reviews
        const updatedLaptop_skin = await Laptop_skin.findById(laptop_skinId).populate('laptopSkinreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedLaptop_skin.laptopSkinreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedLaptop_skin.rating = newRating;
        await updatedLaptop_skin.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
