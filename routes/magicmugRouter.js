const express = require('express');
const Magicmug = require('../models/magicmugModel');

const magicmugRouter = express.Router();

magicmugRouter.get('/',async (req, res) =>{
    const magicmugs = await Magicmug.find();
    res.send(magicmugs);
});

magicmugRouter.get('/slug/:slug', async(req, res) => {
    const magicmug = await Magicmug.findOne({ slug: req.params.slug }).populate('magicmugreviews');
    if (magicmug) {
        res.send(magicmug);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
magicmugRouter.get('/:id', async(req, res) => {
    const magicmug = await Magicmug.findById(req.params.id);
    if (magicmug) {
        res.send(magicmug);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = magicmugRouter;