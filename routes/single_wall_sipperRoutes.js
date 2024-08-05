const express = require('express');
const Singleawllsipper = require('../models/single_wall_sipperModel');

const singlwallsipperRouter = express.Router();

singlwallsipperRouter.get('/',async (req, res) =>{
    const singlwallsippers = await Singleawllsipper.find();
    res.send(singlwallsippers);
});

singlwallsipperRouter.get('/slug/:slug', async(req, res) => {
    const singlwallsippers = await Singleawllsipper.findOne({ slug: req.params.slug }).populate('singlwallsipreviews');
    if (singlwallsippers) {
        res.send(singlwallsippers);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
singlwallsipperRouter.get('/:id', async(req, res) => {
    const singlwallsipper = await Singleawllsipper.findById(req.params.id);
    if (singlwallsipper) {
        res.send(singlwallsipper);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = singlwallsipperRouter;