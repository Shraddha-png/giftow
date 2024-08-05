const express = require('express');
const router = express.Router();
const Antiskitbottles_Review = require('../reviews Model/antiskitbotRevModel');
const Antiskitbottles = require('../models/antiskitbottleModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, antiskitbottleId } = req.body;

    try {
        const antiskitbottle = await Antiskitbottles.findById(antiskitbottleId);
        if (!antiskitbottle) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Antiskitbottles_Review({
            rating: Number(rating),
            title,
            comment,
            antiskitbottle: antiskitbottleId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        antiskitbottle.antiskitbotreviews.push(createdReview._id);
        antiskitbottle.numReviews = antiskitbottle.antiskitbotreviews.length;

        // Save the updated product
        await antiskitbottle.save();

        // Fetch the updated product with populated reviews
        const updatedAntiskitbottles = await Antiskitbottles.findById(antiskitbottleId).populate('antiskitbotreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedAntiskitbottles.antiskitbotreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedAntiskitbottles.rating = newRating;
        await updatedAntiskitbottles.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
