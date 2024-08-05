const express = require('express');
const router = express.Router();
const Document_printing_Review = require('../reviews Model/docmentpriRevModel');
const Document_printing = require('../models/document_printingModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, document_printingId } = req.body;

    try {
        const document_printing = await Document_printing.findById(document_printingId);
        if (!document_printing) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Document_printing_Review({
            rating: Number(rating),
            title,
            comment,
            document_printing: document_printingId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        document_printing.docprireviews.push(createdReview._id);
        document_printing.numReviews = document_printing.docprireviews.length;

        // Save the updated product
        await document_printing.save();

        // Fetch the updated product with populated reviews
        const updatedDocument_printing = await Document_printing.findById(document_printingId).populate('docprireviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedDocument_printing.docprireviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedDocument_printing.rating = newRating;
        await updatedDocument_printing.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
