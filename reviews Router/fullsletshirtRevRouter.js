const express = require('express');
const router = express.Router();
const Fullsleave_tshirt_Review = require('../reviews Model/fullsletshirtRevModel');
const Fullsleave_tshirt = require('../models/fullsleave_tshirtModel')
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, fullsleave_tshirtId } = req.body;

    try {
        const fullsleave_tshirt = await Fullsleave_tshirt.findById(fullsleave_tshirtId);
        if (!fullsleave_tshirt) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Fullsleave_tshirt_Review({
            rating: Number(rating),
            title,
            comment,
            fullsleave_tshirt: fullsleave_tshirtId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        fullsleave_tshirt.fullslvtshirtreviews.push(createdReview._id);
        fullsleave_tshirt.numReviews = fullsleave_tshirt.fullslvtshirtreviews.length;

        // Save the updated product
        await fullsleave_tshirt.save();

        // Fetch the updated product with populated reviews
        const updatedFullsleave_tshirt = await Fullsleave_tshirt.findById(fullsleave_tshirtId).populate('fullslvtshirtreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedFullsleave_tshirt.fullslvtshirtreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedFullsleave_tshirt.rating = newRating;
        await updatedFullsleave_tshirt.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
