const express = require('express');
const router = express.Router();
const Couple_tshirt_Review = require('../reviews Model/coupleTshirtRevmodel');
const Couple_tshirt = require('../models/couple_tshirtModel')
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, couple_tshirtId } = req.body;

    try {
        const couple_tshirt = await Couple_tshirt.findById(couple_tshirtId);
        if (!couple_tshirt) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Couple_tshirt_Review({
            rating: Number(rating),
            title,
            comment,
            couple_tshirt: couple_tshirtId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        couple_tshirt.coupletishirtreviews.push(createdReview._id);
        couple_tshirt.numReviews = couple_tshirt.coupletishirtreviews.length;

        // Save the updated product
        await couple_tshirt.save();

        // Fetch the updated product with populated reviews
        const updatedCouple_tshirt = await Couple_tshirt.findById(couple_tshirtId).populate('coupletishirtreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedCouple_tshirt.coupletishirtreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedCouple_tshirt.rating = newRating;
        await updatedCouple_tshirt.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
