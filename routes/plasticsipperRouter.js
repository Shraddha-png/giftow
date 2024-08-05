const express = require('express');
const Plasticsipper = require('../models/plasticsipperModel');

const plasticsipperRouter = express.Router();

plasticsipperRouter.get('/',async (req, res) =>{
    const plasticsippers = await Plasticsipper.find();
    res.send(plasticsippers);
});

plasticsipperRouter.get('/slug/:slug', async(req, res) => {
    const plasticsipper = await Plasticsipper.findOne({ slug: req.params.slug }).populate('plasticsipreviews');
    if (plasticsipper) {
        res.send(plasticsipper);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
plasticsipperRouter.get('/:id', async(req, res) => {
    const plasticsipper = await Plasticsipper.findById(req.params.id);
    if (plasticsipper) {
        res.send(plasticsipper);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = plasticsipperRouter;