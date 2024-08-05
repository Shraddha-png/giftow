const express = require('express');

const Girls_tshirt = require('../models/girls_tshirtModel')

const girls_tshirtRouter = express.Router();


girls_tshirtRouter.get('/', async (req, res) => {
    const girls_tshirts = await Girls_tshirt.find();
    res.send(girls_tshirts);
});


girls_tshirtRouter.get('/slug/:slug', async (req, res) => {
    const girls_tshirt = await Girls_tshirt.findOne({ slug: req.params.slug }).populate('girlstshirtreviews');
    if (girls_tshirt) {
        res.send(girls_tshirt);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});


girls_tshirtRouter.get('/:id', async (req, res) => {
    const girls_tshirt = await Girls_tshirt.findById(req.params.id);
    if (girls_tshirt) {
        res.send(girls_tshirt);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = girls_tshirtRouter;