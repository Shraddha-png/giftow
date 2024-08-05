const express = require('express');
const router = express.Router();
const Flyer_pamplate_Review = require('../reviews Model/flyerPampRevModel');
const Flyer_pamplate = require('../models/flyer_pamplateModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, flyer_pamplateId } = req.body;

    try {
        const flyer_pamplate = await Flyer_pamplate.findById(flyer_pamplateId);
        if (!flyer_pamplate) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Flyer_pamplate_Review({
            rating: Number(rating),
            title,
            comment,
            flyer_pamplate: flyer_pamplateId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        flyer_pamplate.flyerpampreviews.push(createdReview._id);
        flyer_pamplate.numReviews = flyer_pamplate.flyerpampreviews.length;

        // Save the updated product
        await flyer_pamplate.save();

        // Fetch the updated product with populated reviews
        const updatedFlyer_pamplate = await Flyer_pamplate.findById(flyer_pamplateId).populate('flyerpampreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedFlyer_pamplate.flyerpampreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedFlyer_pamplate.rating = newRating;
        await updatedFlyer_pamplate.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
