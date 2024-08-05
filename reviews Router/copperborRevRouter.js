const express = require('express');
const router = express.Router();
const Copperbottle_Review = require('../reviews Model/copperBotRevModel');
const Copperbottle = require('../models/copperbottleModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, copperbottleId } = req.body;

    try {
        const copperbottle = await Copperbottle.findById(copperbottleId);
        if (!copperbottle) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Copperbottle_Review({
            rating: Number(rating),
            title,
            comment,
            copperbottle: copperbottleId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        copperbottle.acopersipreviews.push(createdReview._id);
        copperbottle.numReviews = copperbottle.acopersipreviews.length;

        // Save the updated product
        await copperbottle.save();

        // Fetch the updated product with populated reviews
        const updatedCopperbottle = await Copperbottle.findById(copperbottleId).populate('acopersipreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedCopperbottle.acopersipreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedCopperbottle.rating = newRating;
        await updatedCopperbottle.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
