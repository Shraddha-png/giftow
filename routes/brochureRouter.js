const express = require('express');
const Brochure = require('../models/brochureModel');

const brochureRouter = express.Router();

brochureRouter.get('/',async (req, res) =>{
    const brochures = await Brochure.find();
    res.send(brochures);
});

brochureRouter.get('/slug/:slug', async(req, res) => {
    const brochure = await Brochure.findOne({ slug: req.params.slug }).populate('brochurereviews');
    if (brochure) {
        res.send(brochure);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
brochureRouter.get('/:id', async(req, res) => {
    const brochure = await Brochure.findById(req.params.id);
    if (brochure) {
        res.send(brochure);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = brochureRouter;