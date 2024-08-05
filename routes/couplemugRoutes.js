const express = require('express');
const Couplemug = require('../models/couplemugModel');

const couplemugRouter = express.Router();

couplemugRouter.get('/',async (req, res) =>{
    const couplemugs = await Couplemug.find();
    res.send(couplemugs);
});

couplemugRouter.get('/slug/:slug', async(req, res) => {
    const couplemug = await Couplemug.findOne({ slug: req.params.slug }).populate('cmugreviews');
    if (couplemug) {
        res.send(couplemug);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
couplemugRouter.get('/:id', async(req, res) => {
    const couplemug = await Couplemug.findById(req.params.id);
    if (couplemug) {
        res.send(couplemug);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = couplemugRouter;