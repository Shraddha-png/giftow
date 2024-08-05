const express = require('express');
const Headphone = require('../models/headphoneModel');

const headphoneRouter = express.Router();

headphoneRouter.get('/',async (req, res) =>{
    const headphones = await Headphone.find();
    res.send(headphones);
});

headphoneRouter.get('/slug/:slug', async(req, res) => {
    const headphone = await Headphone.findOne({ slug: req.params.slug }).populate('headphonereviews');
    if (headphone) {
        res.send(headphone);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
headphoneRouter.get('/:id', async(req, res) => {
    const headphone = await Headphone.findById(req.params.id);
    if (headphone) {
        res.send(headphone);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = headphoneRouter;
