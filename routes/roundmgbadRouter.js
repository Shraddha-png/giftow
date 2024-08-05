const express = require('express');
const Roundmagbadge = require('../models/roundmagbadgeModel.js');

const roundmgbadgeRouter = express.Router();

roundmgbadgeRouter.get('/',async (req, res) =>{
    const roundmgbadges = await Roundmagbadge.find();
    res.send(roundmgbadges);
});

roundmgbadgeRouter.get('/slug/:slug', async(req, res) => {
    const roundmgbadge = await Roundmagbadge.findOne({ slug: req.params.slug }).populate('roundmgbadgereviews');
    if (roundmgbadge) {
        res.send(roundmgbadge);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
roundmgbadgeRouter.get('/:id', async(req, res) => {
    const roundmgbadge = await Roundmagbadge.findById(req.params.id);
    if (roundmgbadge) {
        res.send(roundmgbadge);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = roundmgbadgeRouter;