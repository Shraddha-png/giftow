const express = require('express');
const Slingbag = require('../models/slingbagsModel');

const slingbagRouter = express.Router();

slingbagRouter.get('/',async (req, res) =>{
    const slingbags = await Slingbag.find();
    res.send(slingbags);
});

slingbagRouter.get('/slug/:slug', async(req, res) => {
    const slingbag = await Slingbag.findOne({ slug: req.params.slug }).populate('slingbagreviews');
    if (slingbag) {
        res.send(slingbag);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
slingbagRouter.get('/:id', async(req, res) => {
    const slingbag = await Slingbag.findById(req.params.id);
    if (slingbag) {
        res.send(slingbag);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = slingbagRouter;
