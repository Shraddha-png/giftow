const express = require('express');
const Jutebag = require('../models/jutebagModel');

const jutebagRouter = express.Router();

jutebagRouter.get('/',async (req, res) =>{
    const jutebags = await Jutebag.find();
    res.send(jutebags);
});

jutebagRouter.get('/slug/:slug', async(req, res) => {
    const jutebag = await Jutebag.findOne({ slug: req.params.slug }).populate('jutebagreviews');
    if (jutebag) {
        res.send(jutebag);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
jutebagRouter.get('/:id', async(req, res) => {
    const jutebag = await Jutebag.findById(req.params.id);
    if (jutebag) {
        res.send(jutebag);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = jutebagRouter;