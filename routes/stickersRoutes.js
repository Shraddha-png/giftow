const express = require('express');
const Sticker = require('../models/stickerModel');

const stickerRouter = express.Router();

stickerRouter.get('/',async (req, res) =>{
    const stickers = await Sticker.find();
    res.send(stickers);
});

stickerRouter.get('/slug/:slug', async(req, res) => {
    const sticker = await Sticker.findOne({ slug: req.params.slug }).populate('stickerreviews');
    if (sticker) {
        res.send(sticker);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
stickerRouter.get('/:id', async(req, res) => {
    const sticker = await Sticker.findById(req.params.id);
    if (sticker) {
        res.send(sticker);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = stickerRouter;