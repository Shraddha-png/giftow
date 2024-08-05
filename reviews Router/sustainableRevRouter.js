const express = require('express');
const router = express.Router();
const SustainablesItems_Review = require('../reviews Model/sustainableItmRevModel');
const SustainablesItems = require('../models/sustainablesItemsModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, sustainablesitemId } = req.body;

    try {
        const sustainablesitem = await SustainablesItems.findById(sustainablesitemId);
        if (!sustainablesitem) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new SustainablesItems_Review({
            rating: Number(rating),
            title,
            comment,
            sustainablesitem: sustainablesitemId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        sustainablesitem.susitemreviews.push(createdReview._id);
        sustainablesitem.numReviews = sustainablesitem.susitemreviews.length;

        // Save the updated product
        await sustainablesitem.save();

        // Fetch the updated product with populated reviews
        const updatedSustainablesItems = await SustainablesItems.findById(sustainablesitemId).populate('susitemreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedSustainablesItems.susitemreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedSustainablesItems.rating = newRating;
        await updatedSustainablesItems.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;
