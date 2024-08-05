// routes/mugRoutes.js
const express = require('express');
const Mug = require('../models/mugModel');

const mugRouter = express.Router();

// Get all mugs
mugRouter.get('/', async (req, res) => {
    const mugs = await Mug.find();
    res.send(mugs);
});

// Get mug by slug
mugRouter.get('/slug/:slug', async (req, res) => {
    const mug = await Mug.findOne({ slug: req.params.slug }).populate('mugreviews');
    if (mug) {
        res.send(mug);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

// Get mug by ID
mugRouter.get('/:id', async (req, res) => {
    const mug = await Mug.findById(req.params.id);
    if (mug) {
        res.send(mug);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = mugRouter;
