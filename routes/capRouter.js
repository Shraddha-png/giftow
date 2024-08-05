const express = require('express');

const Cap = require('../models/capModel')

const capRouter = express.Router();


capRouter.get('/', async (req, res) => {
    const caps = await Cap.find();
    res.send(caps);
});


capRouter.get('/slug/:slug', async (req, res) => {
    const cap = await Cap.findOne({ slug: req.params.slug }).populate('capreviews');
    if (cap) {
        res.send(cap);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});


capRouter.get('/:id', async (req, res) => {
    const cap = await Cap.findById(req.params.id);
    if (cap) {
        res.send(cap);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = capRouter;