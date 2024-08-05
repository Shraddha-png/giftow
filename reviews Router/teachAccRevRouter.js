const express = require('express');
const router = express.Router();
const Teach_Acc_Review = require('../reviews Model/teachAccRevModel');
const Teach_Acc = require('../models/teachaccModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, teachaccesorieId } = req.body;

    try {
        const teachaccesorie = await Teach_Acc.findById(teachaccesorieId);
        if (!teachaccesorie) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Teach_Acc_Review({
            rating: Number(rating),
            title,
            comment,
            teachaccesorie: teachaccesorieId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        teachaccesorie.techaccreviews.push(createdReview._id);
        teachaccesorie.numReviews = teachaccesorie.techaccreviews.length;

        // Save the updated product
        await teachaccesorie.save();

        // Fetch the updated product with populated reviews
        const updatedTeach_Acc = await Teach_Acc.findById(teachaccesorieId).populate('techaccreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedTeach_Acc.techaccreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedTeach_Acc.rating = newRating;
        await updatedTeach_Acc.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
