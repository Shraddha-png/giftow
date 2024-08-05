const express = require('express');
const router = express.Router();
const Domnmplate_Review = require('../reviews Model/domnmplateRevModel');
const Domnmplate = require('../models/domnmplateModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, domnmplateId } = req.body;

    try {
        const domnmplate = await Domnmplate.findById(domnmplateId);
        if (!domnmplate) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Domnmplate_Review({
            rating: Number(rating),
            title,
            comment,
            domnmplate: domnmplateId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        domnmplate.domnmplatereviews.push(createdReview._id);
        domnmplate.numReviews = domnmplate.domnmplatereviews.length;

        // Save the updated product
        await domnmplate.save();

        // Fetch the updated product with populated reviews
        const updatedDomnmplate = await Domnmplate.findById(domnmplateId).populate('domnmplatereviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedDomnmplate.domnmplatereviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedDomnmplate.rating = newRating;
        await updatedDomnmplate.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
