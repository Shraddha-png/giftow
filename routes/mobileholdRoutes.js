const express = require('express');
const Mobilehold = require('../models/mobileholdModel');

const mobileholdRouter = express.Router();

mobileholdRouter.get('/',async (req, res) =>{
    const mobileholds = await Mobilehold.find();
    res.send(mobileholds);
});

mobileholdRouter.get('/slug/:slug', async(req, res) => {
    const mobilehold = await Mobilehold.findOne({ slug: req.params.slug }).populate('mobreviews');
    if (mobilehold) {
        res.send(mobilehold);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
mobileholdRouter.get('/:id', async(req, res) => {
    const mobilehold = await Mobilehold.findById(req.params.id);
    if (mobilehold) {
        res.send(mobilehold);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = mobileholdRouter;