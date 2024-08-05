const express = require('express');
const Travelbag = require('../models/travelbagModel');

const travelbagRouter = express.Router();

travelbagRouter.get('/',async (req, res) =>{
    const travelbags = await Travelbag.find();
    res.send(travelbags);
});

travelbagRouter.get('/slug/:slug', async(req, res) => {
    const travelbag = await Travelbag.findOne({ slug: req.params.slug }).populate('travelbagreviews');
    if (travelbag) {
        res.send(travelbag);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
travelbagRouter.get('/:id', async(req, res) => {
    const travelbag = await Travelbag.findById(req.params.id);
    if (travelbag) {
        res.send(travelbag);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = travelbagRouter;
