const express = require('express');

const Dry_fit_tshirt = require('../models/dry_fit_tshirtModel')

const dry_fit_tshirtRouter = express.Router();


dry_fit_tshirtRouter.get('/', async (req, res) => {
    const dry_fit_tshirts = await Dry_fit_tshirt.find();
    res.send(dry_fit_tshirts);
});


dry_fit_tshirtRouter.get('/slug/:slug', async (req, res) => {
    const dry_fit_tshirt = await Dry_fit_tshirt.findOne({ slug: req.params.slug }).populate('dryfittishreviews');
    if (dry_fit_tshirt) {
        res.send(dry_fit_tshirt);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});


dry_fit_tshirtRouter.get('/:id', async (req, res) => {
    const dry_fit_tshirt = await Dry_fit_tshirt.findById(req.params.id);
    if (dry_fit_tshirt) {
        res.send(dry_fit_tshirt);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = dry_fit_tshirtRouter;