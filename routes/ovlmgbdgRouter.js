const express = require('express');
const Ovalbadge = require('../models/ovalbadgeModel.js');

const ovlmgbadgeRouter = express.Router();

ovlmgbadgeRouter.get('/',async (req, res) =>{
    const ovlmgbadges = await Ovalbadge.find();
    res.send(ovlmgbadges);
});

ovlmgbadgeRouter.get('/slug/:slug', async(req, res) => {
    const dommagbadge = await Ovalbadge.findOne({ slug: req.params.slug }).populate('ovelbdgreviews');
    if (dommagbadge) {
        res.send(dommagbadge);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
ovlmgbadgeRouter.get('/:id', async(req, res) => {
    const ovlmgbadge = await Ovalbadge.findById(req.params.id);
    if (ovlmgbadge) {
        res.send(ovlmgbadge);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = ovlmgbadgeRouter;
