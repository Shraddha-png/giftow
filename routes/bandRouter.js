const express = require('express');
const Band = require('../models/bandModel');

const bandRouter = express.Router();

bandRouter.get('/',async (req, res) =>{
    const bands = await Band.find();
    res.send(bands);
});

bandRouter.get('/slug/:slug', async(req, res) => {
    const band = await Band.findOne({ slug: req.params.slug }).populate('bandreviews');
    if (band) {
        res.send(band);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
bandRouter.get('/:id', async(req, res) => {
    const band = await Band.findById(req.params.id);
    if (band) {
        res.send(band);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = bandRouter;