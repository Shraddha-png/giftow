const express = require('express');
const router = express.Router();
const Mobile_accessories_Review = require('../reviews Model/mobile_accRevModel');
const Mobile_accessories = require('../models/mobileaccessoriesModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, mobile_accessorieId } = req.body;

    try {
        const mobile_accessorie = await Mobile_accessories.findById(mobile_accessorieId);
        if (!mobile_accessorie) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Mobile_accessories_Review({
            rating: Number(rating),
            title,
            comment,
            mobile_accessorie: mobile_accessorieId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        mobile_accessorie.mobileAccreviews.push(createdReview._id);
        mobile_accessorie.numReviews = mobile_accessorie.mobileAccreviews.length;

        // Save the updated product
        await mobile_accessorie.save();

        // Fetch the updated product with populated reviews
        const updatedMobile_accessories = await Mobile_accessories.findById(mobile_accessorieId).populate('mobileAccreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedMobile_accessories.mobileAccreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedMobile_accessories.rating = newRating;
        await updatedMobile_accessories.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
