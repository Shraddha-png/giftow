const express = require('express');
const Clipnamebadge = require('../models/clipbadgeModel.js');

const clipplabadgeRouter = express.Router();

clipplabadgeRouter.get('/',async (req, res) =>{
    const clipplabadges = await Clipnamebadge.find();
    res.send(clipplabadges);
});

clipplabadgeRouter.get('/slug/:slug', async(req, res) => {
    const clipplabadge = await Clipnamebadge.findOne({ slug: req.params.slug }).populate('clipplabdgreviews');
    if (clipplabadge) {
        res.send(clipplabadge);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
clipplabadgeRouter.get('/:id', async(req, res) => {
    const clipplabadge = await Clipnamebadge.findById(req.params.id);
    if (clipplabadge) {
        res.send(clipplabadge);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = clipplabadgeRouter;
