const express = require('express');
const router = express.Router();
const Polo_tshirt_Review = require('../reviews Model/polotshirtRevModel');
const Polo_tshirt = require('../models/polo_tshirtModel')
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, polo_tshirtId } = req.body;

    try {
        const polo_tshirt = await Polo_tshirt.findById(polo_tshirtId);
        if (!polo_tshirt) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Polo_tshirt_Review({
            rating: Number(rating),
            title,
            comment,
            polo_tshirt: polo_tshirtId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        polo_tshirt.polotshirtreviews.push(createdReview._id);
        polo_tshirt.numReviews = polo_tshirt.polotshirtreviews.length;

        // Save the updated product
        await polo_tshirt.save();

        // Fetch the updated product with populated reviews
        const updatedPolo_tshirt = await Polo_tshirt.findById(polo_tshirtId).populate('polotshirtreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedPolo_tshirt.polotshirtreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedPolo_tshirt.rating = newRating;
        await updatedPolo_tshirt.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
