const express = require('express');
const Coaster = require('../models/coasterModel');

const coasterRouter = express.Router();

coasterRouter.get('/',async (req, res) =>{
    const coasters = await Coaster.find();
    res.send(coasters);
});

coasterRouter.get('/slug/:slug', async(req, res) => {
    const coaster = await Coaster.findOne({ slug: req.params.slug }).populate('coastreviews');
    if (coaster) {
        res.send(coaster);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
coasterRouter.get('/:id', async(req, res) => {
    const coaster = await Coaster.findById(req.params.id);
    if (coaster) {
        res.send(coaster);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = coasterRouter;