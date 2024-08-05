const express = require('express');
const router = express.Router();
const Tshirt_Review = require('../reviews Model/tshirtReviewModel');
const Tshirt = require('../models/tshirtsModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, tshirtId } = req.body;

    try {
        const tshirt = await Tshirt.findById(tshirtId);
        if (!tshirt) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Tshirt_Review({
            rating: Number(rating),
            title,
            comment,
            tshirt: tshirtId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        tshirt.treviews.push(createdReview._id);
        tshirt.numReviews = tshirt.treviews.length;

        // Save the updated product
        await tshirt.save();

        // Fetch the updated product with populated reviews
        const updatedTshirt = await Tshirt.findById(tshirtId).populate('treviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedTshirt.treviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedTshirt.rating = newRating;
        await updatedTshirt.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
