const express = require('express');
const Bamboomug = require('../models/bambooModel');

const bamboomugRouter = express.Router();

bamboomugRouter.get('/',async (req, res) =>{
    const bomboomugs = await Bamboomug.find();
    res.send(bomboomugs);
});

bamboomugRouter.get('/slug/:slug', async(req, res) => {
    const bomboomug = await Bamboomug.findOne({ slug: req.params.slug }).populate('bambo_mugreviews');
    if (bomboomug) {
        res.send(bomboomug);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
bamboomugRouter.get('/:id', async(req, res) => {
    const bomboomug = await Bamboomug.findById(req.params.id);
    if (bomboomug) {
        res.send(bomboomug);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = bamboomugRouter;