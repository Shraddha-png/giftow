const express = require('express');
const Speaker = require('../models/speakerModel');

const speakerRouter = express.Router();

speakerRouter.get('/', async (req, res) => {
    const speakers = await Speaker.find();
    res.send(speakers);
});

speakerRouter.get('/slug/:slug', async (req, res) => {
    const speaker = await Speaker.findOne({ slug: req.params.slug }).populate('speakerreviews');
    if (speaker) {
        res.send(speaker);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }

});
speakerRouter.get('/:id', async (req, res) => {
    const speaker = await Speaker.findById(req.params.id);
    if (speaker) {
        res.send(speaker);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = speakerRouter;