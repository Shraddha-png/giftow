const express = require('express');
const Flyer_pamplate = require('../models/flyer_pamplateModel');

const flyer_pamplateRouter = express.Router();

flyer_pamplateRouter.get('/',async (req, res) =>{
    const flyer_pamplates = await Flyer_pamplate.find();
    res.send(flyer_pamplates);
});

flyer_pamplateRouter.get('/slug/:slug', async(req, res) => {
    const flyer_pamplate = await Flyer_pamplate.findOne({ slug: req.params.slug }).populate('flyerpampreviews');
    if (flyer_pamplate) {
        res.send(flyer_pamplate);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
flyer_pamplateRouter.get('/:id', async(req, res) => {
    const flyer_pamplate = await Flyer_pamplate.findById(req.params.id);
    if (flyer_pamplate) {
        res.send(flyer_pamplate);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = flyer_pamplateRouter;