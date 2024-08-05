const express = require('express');
const router = express.Router();
const Schoolbag_Review = require('../reviews Model/schoolbagRevModel');
const Schoolbag = require('../models/schoolbagsModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, schoolbagId } = req.body;

    try {
        const schoolbag = await Schoolbag.findById(schoolbagId);
        if (!schoolbag) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Schoolbag_Review({
            rating: Number(rating),
            title,
            comment,
            schoolbag: schoolbagId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        schoolbag.schoolbagreviews.push(createdReview._id);
        schoolbag.numReviews = schoolbag.schoolbagreviews.length;

        // Save the updated product
        await schoolbag.save();

        // Fetch the updated product with populated reviews
        const updatedSchoolbag = await Schoolbag.findById(schoolbagId).populate('schoolbagreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedSchoolbag.schoolbagreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedSchoolbag.rating = newRating;
        await updatedSchoolbag.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
