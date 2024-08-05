const express = require('express');
const Non_wovenbag = require('../models/non_wovenbagModel');

const non_wovenbagRouter = express.Router();

non_wovenbagRouter.get('/',async (req, res) =>{
    const non_wovenbags = await Non_wovenbag.find();
    res.send(non_wovenbags);
});

non_wovenbagRouter.get('/slug/:slug', async(req, res) => {
    const non_wovenbag = await Non_wovenbag.findOne({ slug: req.params.slug }).populate('nonwovenbagreviews');
    if (non_wovenbag) {
        res.send(non_wovenbag);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
non_wovenbagRouter.get('/:id', async(req, res) => {
    const non_wovenbag = await Non_wovenbag.findById(req.params.id);
    if (non_wovenbag) {
        res.send(non_wovenbag);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = non_wovenbagRouter;
