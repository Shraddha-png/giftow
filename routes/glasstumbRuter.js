const express = require('express');
const GlassTumb = require('../models/glasstumbModel');

const glasstumblerRouter = express.Router();

glasstumblerRouter.get('/',async (req, res) =>{
    const glasstumblers = await GlassTumb.find();
    res.send(glasstumblers);
});

glasstumblerRouter.get('/slug/:slug', async(req, res) => {
    const glasstumbler = await GlassTumb.findOne({ slug: req.params.slug }).populate('glasstumbreviews');
    if (glasstumbler) {
        res.send(glasstumbler);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
glasstumblerRouter.get('/:id', async(req, res) => {
    const glasstumbler = await GlassTumb.findById(req.params.id);
    if (glasstumbler) {
        res.send(glasstumbler);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = glasstumblerRouter;