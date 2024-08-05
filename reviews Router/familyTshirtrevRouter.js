
const express = require('express');
const router = express.Router();
const Family_Review = require('../reviews Model/familyTishirtrevModel');
const Family = require('../models/family_tishirtModel')
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, family_tshirtId } = req.body;

    try {
        const family_tshirt = await Family.findById(family_tshirtId);
        if (!family_tshirt) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Family_Review({
            rating: Number(rating),
            title,
            comment,
            family_tshirt: family_tshirtId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        family_tshirt.familyreviews.push(createdReview._id);
        family_tshirt.numReviews = family_tshirt.familyreviews.length;

        // Save the updated product
        await family_tshirt.save();

        // Fetch the updated product with populated reviews
        const updatedFamily = await Family.findById(family_tshirtId).populate('familyreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedFamily.familyreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedFamily.rating = newRating;
        await updatedFamily.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
