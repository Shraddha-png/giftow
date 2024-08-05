const express = require('express');

const Couple_tshirt = require('../models/couple_tshirtModel')

const couple_tshirtRouter = express.Router();


couple_tshirtRouter.get('/', async (req, res) => {
    const couple_tshirts = await Couple_tshirt.find();
    res.send(couple_tshirts);
});


couple_tshirtRouter.get('/slug/:slug', async (req, res) => {
    const couple_tshirt = await Couple_tshirt.findOne({ slug: req.params.slug }).populate('coupletishirtreviews');
    if (couple_tshirt) {
        res.send(couple_tshirt);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});


couple_tshirtRouter.get('/:id', async (req, res) => {
    const couple_tshirt = await Couple_tshirt.findById(req.params.id);
    if (couple_tshirt) {
        res.send(couple_tshirt);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = couple_tshirtRouter;