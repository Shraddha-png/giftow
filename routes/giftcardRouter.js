const express = require('express');
const Giftcard = require('../models/giftcardmodel');

const giftcardRouter = express.Router();

giftcardRouter.get('/',async (req, res) =>{
    const giftcards = await Giftcard.find();
    res.send(giftcards);
});

giftcardRouter.get('/slug/:slug', async(req, res) => {
    const giftcard = await Giftcard.findOne({ slug: req.params.slug }).populate('giftcardreviews');
    if (giftcard) {
        res.send(giftcard);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
giftcardRouter.get('/:id', async(req, res) => {
    const giftcard = await Giftcard.findById(req.params.id);
    if (giftcard) {
        res.send(giftcard);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = giftcardRouter;