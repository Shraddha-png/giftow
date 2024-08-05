const express = require('express');
const Badge = require('../models/badgesModel');

const badgeRouter = express.Router();

badgeRouter.get('/',async (req, res) =>{
    const badges = await Badge.find();
    res.send(badges);
});

badgeRouter.get('/slug/:slug', async(req, res) => {
    const badge = await Badge.findOne({ slug: req.params.slug }).populate('breviews');
    if (badge) {
        res.send(badge);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
badgeRouter.get('/:id', async(req, res) => {
    const badge = await Badge.findById(req.params.id);
    if (badge) {
        res.send(badge);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = badgeRouter;