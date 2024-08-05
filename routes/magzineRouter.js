const express = require('express');
const Magzine = require('../models/magzineModel');

const magzineRouter = express.Router();

magzineRouter.get('/',async (req, res) =>{
    const magzines = await Magzine.find();
    res.send(magzines);
});

magzineRouter.get('/slug/:slug', async(req, res) => {
    const magzine = await Magzine.findOne({ slug: req.params.slug }).populate('magzinreviews');
    if (magzine) {
        res.send(magzine);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
magzineRouter.get('/:id', async(req, res) => {
    const magzine = await Magzine.findById(req.params.id);
    if (magzine) {
        res.send(magzine);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = magzineRouter;