const express = require('express');
const Pen = require('../models/penModel');

const penRouter = express.Router();

penRouter.get('/', async (req, res) => {
    const pens = await Pen.find();
    res.send(pens);
});

penRouter.get('/slug/:slug', async (req, res) => {
    const pen = await Pen.findOne({ slug: req.params.slug }).populate('penreviews');
    if (pen) {
        res.send(pen);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }

});
penRouter.get('/:id', async (req, res) => {
    const pen = await Pen.findById(req.params.id);
    if (pen) {
        res.send(pen);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = penRouter;