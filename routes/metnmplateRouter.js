const express = require('express');
const Metalnmplate = require('../models/metalnlplatModel');

const metlnmplateRouter = express.Router();

metlnmplateRouter.get('/',async (req, res) =>{
    const metlnmplates = await Metalnmplate.find();
    res.send(metlnmplates);
});

metlnmplateRouter.get('/slug/:slug', async(req, res) => {
    const metlnmplate = await Metalnmplate.findOne({ slug: req.params.slug }).populate('metlnmplaetreviews');
    if (metlnmplate) {
        res.send(metlnmplate);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
metlnmplateRouter.get('/:id', async(req, res) => {
    const metlnmplate = await Metalnmplate.findById(req.params.id);
    if (metlnmplate) {
        res.send(metlnmplate);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = metlnmplateRouter;