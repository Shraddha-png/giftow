const express = require('express');
const router = express.Router();
const Power_Bank_Review = require('../reviews Model/powerbankRevModel');
const Power_Bank = require('../models/power_bankModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, power_bankId } = req.body;

    try {
        const power_bank = await Power_Bank.findById(power_bankId);
        if (!power_bank) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Power_Bank_Review({
            rating: Number(rating),
            title,
            comment,
            power_bank: power_bankId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        power_bank.powerbankreviews.push(createdReview._id);
        power_bank.numReviews = power_bank.powerbankreviews.length;

        // Save the updated product
        await power_bank.save();

        // Fetch the updated product with populated reviews
        const updatedPower_Bank = await Power_Bank.findById(power_bankId).populate('powerbankreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedPower_Bank.powerbankreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedPower_Bank.rating = newRating;
        await updatedPower_Bank.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
