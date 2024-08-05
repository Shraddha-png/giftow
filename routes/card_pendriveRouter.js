const express = require('express');
const Card_PenDrive = require('../models/card_pen_driveModel');

const cardpendriveRouter = express.Router();

cardpendriveRouter.get('/',async (req, res) =>{
    const cardpendrives = await Card_PenDrive.find();
    res.send(cardpendrives);
});

cardpendriveRouter.get('/slug/:slug', async(req, res) => {
    const cardpendrive = await Card_PenDrive.findOne({ slug: req.params.slug }).populate('cardpdreviews');
    if (cardpendrive) {
        res.send(cardpendrive);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
cardpendriveRouter.get('/:id', async(req, res) => {
    const cardpendrive = await Card_PenDrive.findById(req.params.id);
    if (cardpendrive) {
        res.send(cardpendrive);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = cardpendriveRouter;