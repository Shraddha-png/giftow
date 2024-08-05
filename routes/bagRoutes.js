
const express = require('express');
const Bag = require('../models/bagModel');

const bagRouter = express.Router();

bagRouter.get('/',async (req, res) =>{
    const bags = await Bag.find();
    res.send(bags);
});

bagRouter.get('/slug/:slug', async(req, res) => {
    const bag = await Bag.findOne({ slug: req.params.slug }).populate('bagreviews');;
    if (bag) {
        res.send(bag);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
bagRouter.get('/:id', async(req, res) => {
    const bag = await Bag.findById(req.params.id);
    if (bag) {
        res.send(bag);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = bagRouter;