const express = require('express');
const Bottle_sipper = require('../models/bottle_sippersModel');

const bottle_sipperRouter = express.Router();

bottle_sipperRouter.get('/',async (req, res) =>{
    const bottle_sippers = await Bottle_sipper.find();
    res.send(bottle_sippers);
});

bottle_sipperRouter.get('/slug/:slug', async(req, res) => {
    const bottle_sipper = await Bottle_sipper.findOne({ slug: req.params.slug }).populate('bottle_Sipreviews');
    if (bottle_sipper) {
        res.send(bottle_sipper);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
bottle_sipperRouter.get('/:id', async(req, res) => {
    const bottle_sipper = await Bottle_sipper.findById(req.params.id);
    if (bottle_sipper) {
        res.send(bottle_sipper);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = bottle_sipperRouter;