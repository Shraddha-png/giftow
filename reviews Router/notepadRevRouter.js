const express = require('express');
const router = express.Router();
const Notepad_Review = require('../reviews Model/notepadRevModel');
const Notepad = require('../models/notepadMdel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, notepadId } = req.body;

    try {
        const notepad = await Notepad.findById(notepadId);
        if (!notepad) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Notepad_Review({
            rating: Number(rating),
            title,
            comment,
            notepad: notepadId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        notepad.notepadreviews.push(createdReview._id);
        notepad.numReviews = notepad.notepadreviews.length;

        // Save the updated product
        await notepad.save();

        // Fetch the updated product with populated reviews
        const updatedNotepad = await Notepad.findById(notepadId).populate('notepadreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedNotepad.notepadreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedNotepad.rating = newRating;
        await updatedNotepad.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
