const express = require('express');
const Poster = require('../models/posterModel');

const posterRouter = express.Router();

posterRouter.get('/',async (req, res) =>{
    const posters = await Poster.find();
    res.send(posters);
});

posterRouter.get('/slug/:slug', async(req, res) => {
    const poster = await Poster.findOne({ slug: req.params.slug }).populate('posterreviews');
    if (poster) {
        res.send(poster);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
posterRouter.get('/:id', async(req, res) => {
    const poster = await Poster.findById(req.params.id);
    if (poster) {
        res.send(poster);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = posterRouter;