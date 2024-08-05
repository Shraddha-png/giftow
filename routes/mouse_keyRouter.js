const express = require('express');
const Mouse_Key = require('../models/mouse_keyboardModel');

const mousekeyRouter = express.Router();

mousekeyRouter.get('/',async (req, res) =>{
    const mouse_keyboards = await Mouse_Key.find();
    res.send(mouse_keyboards);
});

mousekeyRouter.get('/slug/:slug', async(req, res) => {
    const mouse_keyboard = await Mouse_Key.findOne({ slug: req.params.slug }).populate('mouskeyreviews');
    if (mouse_keyboard) {
        res.send(mouse_keyboard);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
mousekeyRouter.get('/:id', async(req, res) => {
    const mouse_keyboard = await Mouse_Key.findById(req.params.id);
    if (mouse_keyboard) {
        res.send(mouse_keyboard);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = mousekeyRouter;