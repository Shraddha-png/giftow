const express = require('express');
const Fridge_Magnet = require('../models/fridge_mgnetModel')

const fridgeMagnetsRouter = express.Router();

// Get all Frosted Mugs
fridgeMagnetsRouter.get('/', async (req, res) => {
    const fridgeMagnets = await Fridge_Magnet.find();
    res.send(fridgeMagnets);
});

// Get Frosted Mug by slug
fridgeMagnetsRouter.get('/slug/:slug', async (req, res) => {
    const fridgeMagnet = await Fridge_Magnet.findOne({ slug: req.params.slug }).populate('fridgemagreviews');
    if (fridgeMagnet) {
        res.send(fridgeMagnet);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

// Get Frosted Mug by ID
fridgeMagnetsRouter.get('/:id', async (req, res) => {
    const fridgeMagnet = await Fridge_Magnet.findById(req.params.id);
    if (fridgeMagnet) {
        res.send(fridgeMagnet);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = fridgeMagnetsRouter;