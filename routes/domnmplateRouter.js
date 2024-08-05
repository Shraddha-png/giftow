const express = require('express');
const Domnmplate = require('../models/domnmplateModel');

const domnmplateRouter = express.Router();

domnmplateRouter.get('/',async (req, res) =>{
    const domnmplates = await Domnmplate.find();
    res.send(domnmplates);
});

domnmplateRouter.get('/slug/:slug', async(req, res) => {
    const domnmplate = await Domnmplate.findOne({ slug: req.params.slug }).populate('domnmplatereviews');
    if (domnmplate) {
        res.send(domnmplate);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
domnmplateRouter.get('/:id', async(req, res) => {
    const domnmplate = await Domnmplate.findById(req.params.id);
    if (domnmplate) {
        res.send(domnmplate);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = domnmplateRouter;