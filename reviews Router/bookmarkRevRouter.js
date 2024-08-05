const express = require('express');
const router = express.Router();
const Bookmarks_Review = require('../reviews Model/bookmarkRevModel');
const Bookmarks = require('../models/bookmarkModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, bookmarkId } = req.body;

    try {
        const bookmark = await Bookmarks.findById(bookmarkId);
        if (!bookmark) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Bookmarks_Review({
            rating: Number(rating),
            title,
            comment,
            bookmark: bookmarkId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        bookmark.bookmarkreviews.push(createdReview._id);
        bookmark.numReviews = bookmark.bookmarkreviews.length;

        // Save the updated product
        await bookmark.save();

        // Fetch the updated product with populated reviews
        const updatedBookmarks = await Bookmarks.findById(bookmarkId).populate('bookmarkreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedBookmarks.bookmarkreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedBookmarks.rating = newRating;
        await updatedBookmarks.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
