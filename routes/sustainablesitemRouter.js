const express = require('express');
const SustainablesItems = require('../models/sustainablesItemsModel');

const sustainalitemRouter = express.Router();

sustainalitemRouter.get('/',async (req, res) =>{
    const sustainablesitems = await SustainablesItems.find();
    res.send(sustainablesitems);
});

sustainalitemRouter.get('/slug/:slug', async(req, res) => {
    const sustainablesitem = await SustainablesItems.findOne({ slug: req.params.slug }).populate('susitemreviews');
    if (sustainablesitem) {
        res.send(sustainablesitem);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
sustainalitemRouter.get('/:id', async(req, res) => {
    const sustainablesitem = await SustainablesItems.findById(req.params.id);
    if (sustainablesitem) {
        res.send(sustainablesitem);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = sustainalitemRouter;