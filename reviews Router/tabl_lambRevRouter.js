const express = require('express');
const router = express.Router();
const Tablelamp_Review = require('../reviews Model/tabl_lampRevModel');
const Tablelamp = require('../models/tablelampsModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, tablelampId } = req.body;

    try {
        const tablelamp = await Tablelamp.findById(tablelampId);
        if (!tablelamp) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Tablelamp_Review({
            rating: Number(rating),
            title,
            comment,
            tablelamp: tablelampId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        tablelamp.tbllampreviews.push(createdReview._id);
        tablelamp.numReviews = tablelamp.tbllampreviews.length;

        // Save the updated product
        await tablelamp.save();

        // Fetch the updated product with populated reviews
        const updatedTablelamp = await Tablelamp.findById(tablelampId).populate('tbllampreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedTablelamp.tbllampreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedTablelamp.rating = newRating;
        await updatedTablelamp.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
