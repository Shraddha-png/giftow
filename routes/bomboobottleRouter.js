const express = require('express');
const Bomboobottles = require('../models/bomboobottlesModel');

const bomboobottleRouter = express.Router();

bomboobottleRouter.get('/',async (req, res) =>{
    const bomboobottles = await Bomboobottles.find();
    res.send(bomboobottles);
});

bomboobottleRouter.get('/slug/:slug', async(req, res) => {
    const bomboobottle = await Bomboobottles.findOne({ slug: req.params.slug }).populate('bamboobotreviews');
    if (bomboobottle) {
        res.send(bomboobottle);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
bomboobottleRouter.get('/:id', async(req, res) => {
    const bomboobottle = await Bomboobottles.findById(req.params.id);
    if (bomboobottle) {
        res.send(bomboobottle);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = bomboobottleRouter;