const express = require('express');
const Bearmug = require('../models/bearmugModel');

const bearmugRouter = express.Router();

bearmugRouter.get('/',async (req, res) =>{
    const bearmugs = await Bearmug.find();
    res.send(bearmugs);
});

bearmugRouter.get('/slug/:slug', async(req, res) => {
    const bearmug = await Bearmug.findOne({ slug: req.params.slug }).populate('bearmugreviews');
    if (bearmug) {
        res.send(bearmug);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
bearmugRouter.get('/:id', async(req, res) => {
    const bearmug = await Bearmug.findById(req.params.id);
    if (bearmug) {
        res.send(bearmug);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = bearmugRouter;