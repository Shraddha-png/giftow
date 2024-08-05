const express = require('express');
const Sublimation_item = require('../models/sublimation_itemModel');

const sublimation_itemRouter = express.Router();

sublimation_itemRouter.get('/',async (req, res) =>{
    const sublimation_items = await Sublimation_item.find();
    res.send(sublimation_items);
});

sublimation_itemRouter.get('/slug/:slug', async(req, res) => {
    const sublimation_item = await Sublimation_item.findOne({ slug: req.params.slug }).populate('sublimatereviews');
    if (sublimation_item) {
        res.send(sublimation_item);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
sublimation_itemRouter.get('/:id', async(req, res) => {
    const sublimation_item = await Sublimation_item.findById(req.params.id);
    if (sublimation_item) {
        res.send(sublimation_item);  
    } else {sublimation_item
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = sublimation_itemRouter;