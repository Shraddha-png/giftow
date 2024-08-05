const express = require('express');
const router = express.Router();
const PramotionalPro_Review = require('../reviews Model/pramotionalProRevModel');
const PramotionalPro = require('../models/pramothionalProMoodel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, pramotionalproductId } = req.body;

    try {
        const pramotionalproduct = await PramotionalPro.findById(pramotionalproductId);
        if (!pramotionalproduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new PramotionalPro_Review({
            rating: Number(rating),
            title,
            comment,
            pramotionalproduct: pramotionalproductId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        pramotionalproduct.pramotionalproreviews.push(createdReview._id);
        pramotionalproduct.numReviews = pramotionalproduct.pramotionalproreviews.length;

        // Save the updated product
        await pramotionalproduct.save();

        // Fetch the updated product with populated reviews
        const updatedPramotionalPro = await PramotionalPro.findById(pramotionalproductId).populate('pramotionalproreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedPramotionalPro.pramotionalproreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedPramotionalPro.rating = newRating;
        await updatedPramotionalPro.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
