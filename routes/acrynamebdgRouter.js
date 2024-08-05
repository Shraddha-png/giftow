const express = require('express');
const Acrylicbadge = require('../models/acrybadgeModel.js');

const acrynamebadgeRouter = express.Router();

acrynamebadgeRouter.get('/',async (req, res) =>{
    const acrynamebadges = await Acrylicbadge.find();
    res.send(acrynamebadges);
});

acrynamebadgeRouter.get('/slug/:slug', async(req, res) => {
    const acrynamebadge = await Acrylicbadge.findOne({ slug: req.params.slug }).populate('acrnmbgereviews').populate('acrnmbgereviews');
    if (acrynamebadge) {
        res.send(acrynamebadge);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
acrynamebadgeRouter.get('/:id', async(req, res) => {
    const acrynamebadge = await Acrylicbadge.findById(req.params.id);
    if (acrynamebadge) {
        res.send(acrynamebadge);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = acrynamebadgeRouter;
