const express = require('express');
const Metalmgbadge = require('../models/metalmgbadgeModel.js');

const metnamebadgeRouter = express.Router();

metnamebadgeRouter.get('/',async (req, res) =>{
    const metnamebadges = await Metalmgbadge.find();
    res.send(metnamebadges);
});

metnamebadgeRouter.get('/slug/:slug', async(req, res) => {
    const metnamebadge = await Metalmgbadge.findOne({ slug: req.params.slug }).populate('metlmgbdgreviews');
    if (metnamebadge) {
        res.send(metnamebadge);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
metnamebadgeRouter.get('/:id', async(req, res) => {
    const metnamebadge = await Metalmgbadge.findById(req.params.id);
    if (metnamebadge) {
        res.send(metnamebadge);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = metnamebadgeRouter;
