const express = require('express');
const Sipper = require('../models/sipperModel');

const sipperRouter = express.Router();

sipperRouter.get('/',async (req, res) =>{
    const sippers = await Sipper.find();
    res.send(sippers);
});
sipperRouter.get('/slug/:slug', async(req, res) => {
    const sipper = await Sipper.findOne({ slug: req.params.slug }).populate('sipperreviews');
    if (sipper) {
        res.send(sipper);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
sipperRouter.get('/:id', async(req, res) => {
    const sipper = await Sipper.findById(req.params.id);
    if (sipper) {
        res.send(sipper);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = sipperRouter;