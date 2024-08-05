const express = require('express');
const router = express.Router();
const notedirRouter = require('../reviews Model/notedirRevModel');
const NoteDir = require('../models/notedirModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, notedirId } = req.body;

    try {
        const notedir = await NoteDir.findById(notedirId);
        if (!notedir) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new notedirRouter({
            rating: Number(rating),
            title,
            comment,
            notedir: notedirId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        notedir.notedirreviews.push(createdReview._id);
        notedir.numReviews = notedir.notedirreviews.length;

        // Save the updated product
        await notedir.save();

        // Fetch the updated product with populated reviews
        const updatedNoteDir = await NoteDir.findById(notedirId).populate('notedirreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedNoteDir.notedirreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedNoteDir.rating = newRating;
        await updatedNoteDir.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
