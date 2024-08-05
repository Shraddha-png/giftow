const express = require('express');

const Sport_tshirt = require('../models/sport_tshirtModel')

const sports_tshirtRouter = express.Router();


sports_tshirtRouter.get('/', async (req, res) => {
    const sports_tshirts = await Sport_tshirt.find();
    res.send(sports_tshirts);
});


sports_tshirtRouter.get('/slug/:slug', async (req, res) => {
    const sports_tshirt = await Sport_tshirt.findOne({ slug: req.params.slug }).populate('sportstshreviews');
    if (sports_tshirt) {
        res.send(sports_tshirt);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});


sports_tshirtRouter.get('/:id', async (req, res) => {
    const sports_tshirt = await Sport_tshirt.findById(req.params.id);
    if (sports_tshirt) {
        res.send(sports_tshirt);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = sports_tshirtRouter;