const express = require('express');
const router = express.Router();
const Girls_tshirt_Review = require('../reviews Model/girltshirtRevModel');
const Girls_tshirt = require('../models/girls_tshirtModel')
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, girls_tshirtId } = req.body;

    try {
        const girls_tshirt = await Girls_tshirt.findById(girls_tshirtId);
        if (!girls_tshirt) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Girls_tshirt_Review({
            rating: Number(rating),
            title,
            comment,
            girls_tshirt: girls_tshirtId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        girls_tshirt.girlstshirtreviews.push(createdReview._id);
        girls_tshirt.numReviews = girls_tshirt.girlstshirtreviews.length;

        // Save the updated product
        await girls_tshirt.save();

        // Fetch the updated product with populated reviews
        const updatedgirls_tshirt = await Girls_tshirt.findById(girls_tshirtId).populate('girlstshirtreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedgirls_tshirt.girlstshirtreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedgirls_tshirt.rating = newRating;
        await updatedgirls_tshirt.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
