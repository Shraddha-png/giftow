const express = require('express');
const router = express.Router();
const Shakkerbottle_Review = require('../reviews Model/shakerbotRevModel.js');
const Shakkerbottle = require('../models/shakerbottleModel.js');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, shakerbottleId } = req.body;

    try {
        const shakerbottle = await Shakkerbottle.findById(shakerbottleId);
        if (!shakerbottle) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Shakkerbottle_Review({
            rating: Number(rating),
            title,
            comment,
            shakerbottle: shakerbottleId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        shakerbottle.shakbotreviews.push(createdReview._id);
        shakerbottle.numReviews = shakerbottle.shakbotreviews.length;

        // Save the updated product
        await shakerbottle.save();

        // Fetch the updated product with populated reviews
        const updatedShakkerbottle = await Shakkerbottle.findById(shakerbottleId).populate('shakbotreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedShakkerbottle.shakbotreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedShakkerbottle.rating = newRating;
        await updatedShakkerbottle.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
