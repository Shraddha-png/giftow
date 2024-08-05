const express = require('express');
const router = express.Router();
const Desktop_Item_Review = require('../reviews Model/desktopitemRevModel');
const Desktop_Item = require('../models/desktopitemModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, desktopitemId } = req.body;

    try {
        const desktopitem = await Desktop_Item.findById(desktopitemId);
        if (!desktopitem) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Desktop_Item_Review({
            rating: Number(rating),
            title,
            comment,
            desktopitem: desktopitemId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        desktopitem.desktopitemreviews.push(createdReview._id);
        desktopitem.numReviews = desktopitem.desktopitemreviews.length;

        // Save the updated product
        await desktopitem.save();

        // Fetch the updated product with populated reviews
        const updatedDesktop_Item = await Desktop_Item.findById(desktopitemId).populate('desktopitemreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedDesktop_Item.desktopitemreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedDesktop_Item.rating = newRating;
        await updatedDesktop_Item.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
