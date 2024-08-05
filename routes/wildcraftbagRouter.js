const express = require('express');
const Wildcraft = require('../models/wildcraftbagModel');

const wildcraftbagRouter = express.Router();

wildcraftbagRouter.get('/',async (req, res) =>{
    const wildcraftbags = await Wildcraft.find();
    res.send(wildcraftbags);
});

wildcraftbagRouter.get('/slug/:slug', async(req, res) => {
    const wildcraftbag = await Wildcraft.findOne({ slug: req.params.slug }).populate('wildcraftbagreviews');
    if (wildcraftbag) {
        res.send(wildcraftbag);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
wildcraftbagRouter.get('/:id', async(req, res) => {
    const wildcraftbag = await Wildcraft.findById(req.params.id);
    if (wildcraftbag) {
        res.send(wildcraftbag);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = wildcraftbagRouter;
