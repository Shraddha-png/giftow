const express = require('express');
const router = express.Router();
const Folder_Review = require('../reviews Model/folderRevModel');
const Folder = require('../models/folderModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, folderId } = req.body;

    try {
        const folder = await Folder.findById(folderId);
        if (!folder) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Folder_Review({
            rating: Number(rating),
            title,
            comment,
            folder: folderId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        folder.folderreviews.push(createdReview._id);
        folder.numReviews = folder.folderreviews.length;

        // Save the updated product
        await folder.save();

        // Fetch the updated product with populated reviews
        const updatedFolder = await Folder.findById(folderId).populate('folderreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedFolder.folderreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedFolder.rating = newRating;
        await updatedFolder.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
