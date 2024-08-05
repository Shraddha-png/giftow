const express = require('express');
const Travelmug = require('../models/travelmugModel');

const travelmugRouter = express.Router();

travelmugRouter.get('/',async (req, res) =>{
    const travelmugs = await Travelmug.find();
    res.send(travelmugs);
});

travelmugRouter.get('/slug/:slug', async(req, res) => {
    const travelmug = await Travelmug.findOne({ slug: req.params.slug }).populate('Trmugreviews');
    if (travelmug) {
        res.send(travelmug);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
travelmugRouter.get('/:id', async(req, res) => {
    const travelmug = await Travelmug.findById(req.params.id);
    if (travelmug) {
        res.send(travelmug);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = travelmugRouter;