const express = require('express');
const PramotionalPro = require('../models/pramothionalProMoodel');

const pramotionalproRouter = express.Router();

pramotionalproRouter.get('/',async (req, res) =>{
    const pramotionalproducts = await PramotionalPro.find();
    res.send(pramotionalproducts);
});

pramotionalproRouter.get('/slug/:slug', async(req, res) => {
    const pramotionalproduct = await PramotionalPro.findOne({ slug: req.params.slug }).populate('pramotionalproreviews');
    if (pramotionalproduct) {
        res.send(pramotionalproduct);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
pramotionalproRouter.get('/:id', async(req, res) => {
    const pramotionalproduct = await PramotionalPro.findById(req.params.id);
    if (pramotionalproduct) {
        res.send(pramotionalproduct);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = pramotionalproRouter;