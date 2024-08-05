const express = require('express');
const LunchBox = require('../models/lunch_boxModel');

const lunch_boxRouter = express.Router();

lunch_boxRouter.get('/',async (req, res) =>{
    const lunchBoxes = await LunchBox.find();
    res.send(lunchBoxes);
});

lunch_boxRouter.get('/slug/:slug', async(req, res) => {
    const lunchBoxe = await LunchBox.findOne({ slug: req.params.slug }).populate('lunchBoxreviews');
    if (lunchBoxe) {
        res.send(lunchBoxe);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
lunch_boxRouter.get('/:id', async(req, res) => {
    const lunchBoxe = await LunchBox.findById(req.params.id);
    if (lunchBoxe) {
        res.send(lunchBoxe);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = lunch_boxRouter;