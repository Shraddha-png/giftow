const express = require('express');
const router = express.Router();
const Printing_Review = require('../reviews Model/printingRevModel');
const Printing = require('../models/printingModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, printingId } = req.body;

    try {
        const printing = await Printing.findById(printingId);
        if (!printing) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Printing_Review({
            rating: Number(rating),
            title,
            comment,
            printing: printingId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        printing.printreviews.push(createdReview._id);
        printing.numReviews = printing.printreviews.length;

        // Save the updated product
        await printing.save();

        // Fetch the updated product with populated reviews
        const updatedPrinting = await Printing.findById(printingId).populate('printreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedPrinting.printreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedPrinting.rating = newRating;
        await updatedPrinting.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
