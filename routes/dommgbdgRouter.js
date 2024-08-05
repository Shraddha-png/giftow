const express = require('express');
const Dombadge = require('../models/dommgbadgeModel.js');

const dommagbadgeRouter = express.Router();

dommagbadgeRouter.get('/',async (req, res) =>{
    const dommagbadges = await Dombadge.find();
    res.send(dommagbadges);
});

dommagbadgeRouter.get('/slug/:slug', async(req, res) => {
    const dommagbadge = await Dombadge.findOne({ slug: req.params.slug }).populate('dombdgreviews');
    if (dommagbadge) {
        res.send(dommagbadge);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
dommagbadgeRouter.get('/:id', async(req, res) => {
    const dommagbadge = await Dombadge.findById(req.params.id);
    if (dommagbadge) {
        res.send(dommagbadge);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = dommagbadgeRouter;
