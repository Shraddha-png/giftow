const express = require('express');

const FrostedMug = require('../models/frostedMugsModel.js')

const frostedMugRouter = express.Router();

// Get all Frosted Mugs
frostedMugRouter.get('/', async (req, res) => {
    const frostedMugs = await FrostedMug.find();
    res.send(frostedMugs);
});

// Get Frosted Mug by slug
frostedMugRouter.get('/slug/:slug', async (req, res) => {
    const frostedMug = await FrostedMug.findOne({ slug: req.params.slug }).populate('fmreviews');;
    if (frostedMug) {
        res.send(frostedMug);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

// Get Frosted Mug by ID
frostedMugRouter.get('/:id', async (req, res) => {
    const frostedMug = await FrostedMug.findById(req.params.id);
    if (frostedMug) {
        res.send(frostedMug);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = frostedMugRouter;