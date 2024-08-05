const express = require('express');
const router = express.Router();
const MagnamPlate_Review = require('../reviews Model/mgnamplateRevModel');
const Mgnameplate = require('../models/mgnameplateModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, mgnameplateId } = req.body;

    try {
        const mgnameplate = await Mgnameplate.findById(mgnameplateId);
        if (!mgnameplate) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new MagnamPlate_Review({
            rating: Number(rating),
            title,
            comment,
            mgnameplate: mgnameplateId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        mgnameplate.mgnmplatereviews.push(createdReview._id);
        mgnameplate.numReviews = mgnameplate.mgnmplatereviews.length;

        // Save the updated product
        await mgnameplate.save();

        // Fetch the updated product with populated reviews
        const updatedMgnameplate = await Mgnameplate.findById(mgnameplateId).populate('mgnmplatereviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedMgnameplate.mgnmplatereviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedMgnameplate.rating = newRating;
        await updatedMgnameplate.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
