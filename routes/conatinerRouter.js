const express = require('express');
const Container = require('../models/containerModel');

const containerRouter = express.Router();

containerRouter.get('/',async (req, res) =>{
    const containers = await Container.find();
    res.send(containers);
});

containerRouter.get('/slug/:slug', async(req, res) => {
    const container = await Container.findOne({ slug: req.params.slug }).populate('containerreviews');
    if (container) {
        res.send(container);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
containerRouter.get('/:id', async(req, res) => {
    const container = await Container.findById(req.params.id);
    if (container) {
        res.send(container);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = containerRouter;