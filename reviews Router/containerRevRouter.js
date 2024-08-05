const express = require('express');
const router = express.Router();
const Container_Review = require('../reviews Model/containerRevModel');
const Container = require('../models/containerModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, containerId } = req.body;

    try {
        const container = await Container.findById(containerId);
        if (!container) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Container_Review({
            rating: Number(rating),
            title,
            comment,
            container: containerId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        container.containerreviews.push(createdReview._id);
        container.numReviews = container.containerreviews.length;

        // Save the updated product
        await container.save();

        // Fetch the updated product with populated reviews
        const updatedContainer = await Container.findById(containerId).populate('containerreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedContainer.containerreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedContainer.rating = newRating;
        await updatedContainer.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
