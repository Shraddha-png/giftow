const express = require('express');
const Pocmgbadge = require('../models/pockbadgeModel.js');

const pocmagbadgeRouter = express.Router();

pocmagbadgeRouter.get('/',async (req, res) =>{
    const pocmagbadges = await Pocmgbadge.find();
    res.send(pocmagbadges);
});

pocmagbadgeRouter.get('/slug/:slug', async(req, res) => {
    const pocmagbadge = await Pocmgbadge.findOne({ slug: req.params.slug }).populate('pockbdgreviews');
    if (pocmagbadge) {
        res.send(pocmagbadge);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
pocmagbadgeRouter.get('/:id', async(req, res) => {
    const pocmagbadge = await Pocmgbadge.findById(req.params.id);
    if (pocmagbadge) {
        res.send(pocmagbadge);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = pocmagbadgeRouter;
