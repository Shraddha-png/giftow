const express = require('express');
const router = express.Router();
const Notebook_Review = require('../reviews Model/notebookRevModel');
const Notebook = require('../models/notebookModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, notebookId } = req.body;

    try {
        const notebook = await Notebook.findById(notebookId);
        if (!notebook) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Notebook_Review({
            rating: Number(rating),
            title,
            comment,
            notebook: notebookId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        notebook.notebookreviews.push(createdReview._id);
        notebook.numReviews = notebook.notebookreviews.length;

        // Save the updated product
        await notebook.save();

        // Fetch the updated product with populated reviews
        const updatedNotebook = await Notebook.findById(notebookId).populate('notebookreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedNotebook.notebookreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedNotebook.rating = newRating;
        await updatedNotebook.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
