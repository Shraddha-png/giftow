const express = require('express');
const Card_Holder = require('../models/Card_holderModel');

const card_holderRouter = express.Router();

card_holderRouter.get('/',async (req, res) =>{
    const card_holders = await Card_Holder.find();
    res.send(card_holders);
});

card_holderRouter.get('/slug/:slug', async(req, res) => {
    const card_holder = await Card_Holder.findOne({ slug: req.params.slug }).populate('cardholreviews');
    if (card_holder) {
        res.send(card_holder);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
card_holderRouter.get('/:id', async(req, res) => {
    const card_holder = await Card_Holder.findById(req.params.id);
    if (card_holder) {
        res.send(card_holder);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = card_holderRouter;