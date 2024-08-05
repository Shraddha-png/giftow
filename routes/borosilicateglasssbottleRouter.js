const express = require('express');
const Borosilicatesipper = require('../models/borosilicateglassbottleModel');

const borosilicategalssbottleRouter = express.Router();

borosilicategalssbottleRouter.get('/',async (req, res) =>{
    const borosilicategalssbottles = await Borosilicatesipper.find();
    res.send(borosilicategalssbottles);
});

borosilicategalssbottleRouter.get('/slug/:slug', async(req, res) => {
    const borosilicategalssbottl = await Borosilicatesipper.findOne({ slug: req.params.slug }).populate('borosilislassbotreviews');
    if (borosilicategalssbottl) {
        res.send(borosilicategalssbottl);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
borosilicategalssbottleRouter.get('/:id', async(req, res) => {
    const borosilicategalssbottl = await Borosilicatesipper.findById(req.params.id);
    if (borosilicategalssbottl) {
        res.send(borosilicategalssbottl);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = borosilicategalssbottleRouter;