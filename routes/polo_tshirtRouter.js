const express = require('express');

const Polo_tshirt = require('../models/polo_tshirtModel')

const polo_tshirtRouter = express.Router();


polo_tshirtRouter.get('/', async (req, res) => {
    const polo_tshirts = await Polo_tshirt.find();
    res.send(polo_tshirts);
});


polo_tshirtRouter.get('/slug/:slug', async (req, res) => {
    const polo_tshirt = await Polo_tshirt.findOne({ slug: req.params.slug }).populate('polotshirtreviews');
    if (polo_tshirt) {
        res.send(polo_tshirt);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});


polo_tshirtRouter.get('/:id', async (req, res) => {
    const polo_tshirt = await Polo_tshirt.findById(req.params.id);
    if (polo_tshirt) {
        res.send(polo_tshirt);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = polo_tshirtRouter;