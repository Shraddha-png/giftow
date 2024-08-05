const express = require('express');
const router = express.Router();
const Id_landyard_Review = require('../reviews Model/id_laynyardRevModel');
const Id_landyard = require('../models/id_landyardModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, id_landyardId } = req.body;

    try {
        const id_landyard = await Id_landyard.findById(id_landyardId);
        if (!id_landyard) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Id_landyard_Review({
            rating: Number(rating),
            title,
            comment,
            id_landyard: id_landyardId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        id_landyard.id_laynyardreviews.push(createdReview._id);
        id_landyard.numReviews = id_landyard.id_laynyardreviews.length;

        // Save the updated product
        await id_landyard.save();

        // Fetch the updated product with populated reviews
        const updatedId_landyard = await Id_landyard.findById(id_landyardId).populate('id_laynyardreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedId_landyard.id_laynyardreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedId_landyard.rating = newRating;
        await updatedId_landyard.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
