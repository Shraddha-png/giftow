const express = require('express');
const Magnifire = require('../models/magnifiresModel');

const magnifireRouter = express.Router();

magnifireRouter.get('/',async (req, res) =>{
    const magnifires = await Magnifire.find();
    res.send(magnifires);
});

magnifireRouter.get('/slug/:slug', async(req, res) => {
    const magnifire = await Magnifire.findOne({ slug: req.params.slug }).populate('magnifirereviews').populate('magnifirereviews');
    if (magnifire) {
        res.send(magnifire);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
magnifireRouter.get('/:id', async(req, res) => {
    const magnifire = await Magnifire.findById(req.params.id);
    if (magnifire) {
        res.send(magnifire);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = magnifireRouter;
