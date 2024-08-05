const express = require('express');

const Fullsleave_tshirt = require('../models/fullsleave_tshirtModel')

const fullsleave_tshirtRouter = express.Router();


fullsleave_tshirtRouter.get('/', async (req, res) => {
    const fullsleave_tshirts = await Fullsleave_tshirt.find();
    res.send(fullsleave_tshirts);
});


fullsleave_tshirtRouter.get('/slug/:slug', async (req, res) => {
    const fullsleave_tshirt = await Fullsleave_tshirt.findOne({ slug: req.params.slug }).populate('fullslvtshirtreviews');
    if (fullsleave_tshirt) {
        res.send(fullsleave_tshirt);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});


fullsleave_tshirtRouter.get('/:id', async (req, res) => {
    const fullsleave_tshirt = await Fullsleave_tshirt.findById(req.params.id);
    if (fullsleave_tshirt) {
        res.send(fullsleave_tshirt);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = fullsleave_tshirtRouter;