const express = require('express');

const Hoodies = require('../models/hoodiesModel')

const hoodieRouter = express.Router();


hoodieRouter.get('/', async (req, res) => {
    const hoodies = await Hoodies.find();
    res.send(hoodies);
});


hoodieRouter.get('/slug/:slug', async (req, res) => {
    const hoodie = await Hoodies.findOne({ slug: req.params.slug }).populate('hoodiesreviews');
    if (hoodie) {
        res.send(hoodie);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});


hoodieRouter.get('/:id', async (req, res) => {
    const hoodie = await Hoodies.findById(req.params.id);
    if (hoodie) {
        res.send(hoodie);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = hoodieRouter;