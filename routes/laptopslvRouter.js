const express = require('express');
const Laptopslv = require('../models/laptopslvsModel');

const laptopslvRouter = express.Router();

laptopslvRouter.get('/',async (req, res) =>{
    const laptopsleeves = await Laptopslv.find();
    res.send(laptopsleeves);
});

laptopslvRouter.get('/slug/:slug', async(req, res) => {
    const laptopsleeve = await Laptopslv.findOne({ slug: req.params.slug }).populate('laptopslvreviews');
    if (laptopsleeve) {
        res.send(laptopsleeve);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
laptopslvRouter.get('/:id', async(req, res) => {
    const laptopsleeve = await Laptopslv.findById(req.params.id);
    if (laptopsleeve) {
        res.send(laptopsleeve);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = laptopslvRouter;