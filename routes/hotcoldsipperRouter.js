const express = require('express');
const Hotcoldsipper = require('../models/hotcoldsipperModel');

const hotcoldsipperRouter = express.Router();

hotcoldsipperRouter.get('/',async (req, res) =>{
    const hotcoldsippers = await Hotcoldsipper.find();
    res.send(hotcoldsippers);
});

hotcoldsipperRouter.get('/slug/:slug', async(req, res) => {
    const hotcoldsipper = await Hotcoldsipper.findOne({ slug: req.params.slug }).populate('hotcoldsip_reviews');
    if (hotcoldsipper) {
        res.send(hotcoldsipper);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
hotcoldsipperRouter.get('/:id', async(req, res) => {
    const hotcoldsipper = await Hotcoldsipper.findById(req.params.id);
    if (hotcoldsipper) {
        res.send(hotcoldsipper);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = hotcoldsipperRouter;