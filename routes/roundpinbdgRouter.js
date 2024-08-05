const express = require('express');
const Roundpinbadge = require('../models/roundpinbadgeModel.js');

const roundpinbadgeRouter = express.Router();

roundpinbadgeRouter.get('/',async (req, res) =>{
    const roundpinbadges = await Roundpinbadge.find();
    res.send(roundpinbadges);
});

roundpinbadgeRouter.get('/slug/:slug', async(req, res) => {
    const roundpinbadge = await Roundpinbadge.findOne({ slug: req.params.slug }).populate('roundpinbdgreviews');
    if (roundpinbadge) {
        res.send(roundpinbadge);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
roundpinbadgeRouter.get('/:id', async(req, res) => {
    const roundpinbadge = await Roundpinbadge.findById(req.params.id);
    if (roundpinbadge) {
        res.send(roundpinbadge);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = roundpinbadgeRouter;
