const express = require('express');
const Giftset = require('../models/giftsetModel');

const giftsetRouter = express.Router();

giftsetRouter.get('/',async (req, res) =>{
    const giftsets = await Giftset.find();
    res.send(giftsets);
});

giftsetRouter.get('/slug/:slug', async(req, res) => {
    const giftset = await Giftset.findOne({ slug: req.params.slug }).populate('giftreviews');
    if (giftset) {
        res.send(giftset);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
giftsetRouter.get('/:id', async(req, res) => {
    const giftset = await Giftset.findById(req.params.id);
    if (giftset) {
        res.send(giftset);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = giftsetRouter;