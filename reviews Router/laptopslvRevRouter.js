const express = require('express');
const router = express.Router();
const Laptopslv_Review = require('../reviews Model/laptopslvRevModel');
const Laptopslv = require('../models/laptopslvsModel');
const { isAuth } = require('../utils');

router.post('/', isAuth, async (req, res) => {
    const { rating, comment, title, laptopsleeveId } = req.body;

    try {
        const laptopsleeve = await Laptopslv.findById(laptopsleeveId);
        if (!laptopsleeve) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const review = new Laptopslv_Review({
            rating: Number(rating),
            title,
            comment,
            laptopsleeve: laptopsleeveId,
            user: req.user._id, // Assuming user is authenticated
        });

        const createdReview = await review.save();

        // Update product's reviews array and numReviews
        laptopsleeve.laptopslvreviews.push(createdReview._id);
        laptopsleeve.numReviews = laptopsleeve.laptopslvreviews.length;

        // Save the updated product
        await laptopsleeve.save();

        // Fetch the updated product with populated reviews
        const updatedLaptopslv = await Laptopslv.findById(laptopsleeveId).populate('laptopslvreviews').exec();

        // Calculate the new average rating
        const reviewRatings = updatedLaptopslv.laptopslvreviews.map(review => review.rating);
        const newRating = reviewRatings.reduce((acc, r) => acc + r, 0) / reviewRatings.length;

        // Update product's rating
        updatedLaptopslv.rating = newRating;
        await updatedLaptopslv.save();

        res.status(201).json({ message: 'Review created successfully', review: createdReview });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
