const express = require('express');

const Family = require('../models/family_tishirtModel')

const family_tshirtRouter = express.Router();


family_tshirtRouter.get('/', async (req, res) => {
    const family_tshirts = await Family.find();
    res.send(family_tshirts);
});


family_tshirtRouter.get('/slug/:slug', async (req, res) => {
    const family_tshirt = await Family.findOne({ slug: req.params.slug }).populate('familyreviews');
    if (family_tshirt) {
        res.send(family_tshirt);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});


family_tshirtRouter.get('/:id', async (req, res) => {
    const family_tshirt = await Family.findById(req.params.id);
    if (family_tshirt) {
        res.send(family_tshirt);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = family_tshirtRouter;