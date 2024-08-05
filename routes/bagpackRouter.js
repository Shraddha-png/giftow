const express = require('express');
const Bagpack = require('../models/bagpackModel');

const bagpackRouter = express.Router();

bagpackRouter.get('/',async (req, res) =>{
    const bagpacks = await Bagpack.find();
    res.send(bagpacks);
});

bagpackRouter.get('/slug/:slug', async(req, res) => {
    const bagpack = await Bagpack.findOne({ slug: req.params.slug }).populate('bagpackreviews');
    if (bagpack) {
        res.send(bagpack);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
bagpackRouter.get('/:id', async(req, res) => {
    const bagpack = await Bagpack.findById(req.params.id);
    if (bagpack) {
        res.send(bagpack);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = bagpackRouter;