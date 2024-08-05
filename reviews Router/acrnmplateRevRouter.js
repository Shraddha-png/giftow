const express = require('express');
const router = express.Router();
const Acrynmplate_Review = require('../reviews Model/acrnmplateRevModel');
const Acrynmplate = require('../models/acrynmplateModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, acrnmplateId } = req.body;

    try {
        const acrnmplate = await Acrynmplate.findById(acrnmplateId);
        if (!acrnmplate) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Acrynmplate_Review({
            rating: Number(rating),
            title,
            comment,
            acrnmplate: acrnmplateId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        acrnmplate.acrnmplatereviews.push(createdReview._id);
        acrnmplate.numReviews = acrnmplate.acrnmplatereviews.length;

        // Save the updated product
        await acrnmplate.save();

        // Fetch the updated product with populated reviews
        const updatedAcrynmplate = await Acrynmplate.findById(acrnmplateId).populate('acrnmplatereviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedAcrynmplate.acrnmplatereviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedAcrynmplate.rating = newRating;
        await updatedAcrynmplate.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
