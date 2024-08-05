const express = require('express');
const router = express.Router();
const Borosilicatesipper_Review = require('../reviews Model/borosiliglassbotRevModel');
const Borosilicatesipper = require('../models/borosilicateglassbottleModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, borosilicategalssbottlId } = req.body;

    try {
        const borosilicategalssbottl = await Borosilicatesipper.findById(borosilicategalssbottlId);
        if (!borosilicategalssbottl) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Borosilicatesipper_Review({
            rating: Number(rating),
            title,
            comment,
            borosilicategalssbottl: borosilicategalssbottlId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        borosilicategalssbottl.borosilislassbotreviews.push(createdReview._id);
        borosilicategalssbottl.numReviews = borosilicategalssbottl.borosilislassbotreviews.length;

        // Save the updated product
        await borosilicategalssbottl.save();

        // Fetch the updated product with populated reviews
        const updatedBorosilicatesipper = await Borosilicatesipper.findById(borosilicategalssbottlId).populate('borosilislassbotreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedBorosilicatesipper.borosilislassbotreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedBorosilicatesipper.rating = newRating;
        await updatedBorosilicatesipper.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
