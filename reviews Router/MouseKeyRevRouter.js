const express = require('express');
const router = express.Router();
const Mouse_Key_Review = require('../reviews Model/mouseKeyRevModel');
const Mouse_Key = require('../models/mouse_keyboardModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, mouse_keyboardId } = req.body;

    try {
        const mouse_keyboard = await Mouse_Key.findById(mouse_keyboardId);
        if (!mouse_keyboard) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Mouse_Key_Review({
            rating: Number(rating),
            title,
            comment,
            mouse_keyboard: mouse_keyboardId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        mouse_keyboard.mouskeyreviews.push(createdReview._id);
        mouse_keyboard.numReviews = mouse_keyboard.mouskeyreviews.length;

        // Save the updated product
        await mouse_keyboard.save();

        // Fetch the updated product with populated reviews
        const updatedMouse_Key = await Mouse_Key.findById(mouse_keyboardId).populate('mouskeyreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedMouse_Key.mouskeyreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedMouse_Key.rating = newRating;
        await updatedMouse_Key.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
