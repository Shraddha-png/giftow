const express = require('express');
const Acrynmplate = require('../models/acrynmplateModel');

const acrynmplateRouter = express.Router();

acrynmplateRouter.get('/',async (req, res) =>{
    const acrnmplates = await Acrynmplate.find();
    res.send(acrnmplates);
});

acrynmplateRouter.get('/slug/:slug', async(req, res) => {
    const acrnmplate = await Acrynmplate.findOne({ slug: req.params.slug }).populate('acrnmplatereviews');
    if (acrnmplate) {
        res.send(acrnmplate);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
acrynmplateRouter.get('/:id', async(req, res) => {
    const acrnmplate = await Acrynmplate.findById(req.params.id);
    if (acrnmplate) {
        res.send(acrnmplate);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = acrynmplateRouter;