const express = require('express');
const router = express.Router();
const Pinnmplate_Review = require('../reviews Model/pinnmplateRevModel');
const Pinnmplate = require('../models/pinnmplateModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, pinnmplateId } = req.body;

    try {
        const pinnmplate = await Pinnmplate.findById(pinnmplateId);
        if (!pinnmplate) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Pinnmplate_Review({
            rating: Number(rating),
            title,
            comment,
            pinnmplate: pinnmplateId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        pinnmplate.pinnmplatereviews.push(createdReview._id);
        pinnmplate.numReviews = pinnmplate.pinnmplatereviews.length;

        // Save the updated product
        await pinnmplate.save();

        // Fetch the updated product with populated reviews
        const updatedPinnmplate = await Pinnmplate.findById(pinnmplateId).populate('pinnmplatereviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedPinnmplate.pinnmplatereviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedPinnmplate.rating = newRating;
        await updatedPinnmplate.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
