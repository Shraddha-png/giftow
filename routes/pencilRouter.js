const express = require('express');
const Pencil = require('../models/pencilModel');

const pencilRouter = express.Router();

pencilRouter.get('/',async (req, res) =>{
    const pencils = await Pencil.find();
    res.send(pencils);
});

pencilRouter.get('/slug/:slug', async(req, res) => {
    const pencil = await Pencil.findOne({ slug: req.params.slug }).populate('pencilreviews');
    if (pencil) {
        res.send(pencil);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
pencilRouter.get('/:id', async(req, res) => {
    const pencil = await Pencil.findById(req.params.id);
    if (pencil) {
        res.send(pencil);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = pencilRouter;