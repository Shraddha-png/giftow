const express = require('express');
const Mousepad = require('../models/mousepadModel');

const mousepadRouter = express.Router();

mousepadRouter.get('/',async (req, res) =>{
    const mousepads = await Mousepad.find();
    res.send(mousepads);
});

mousepadRouter.get('/slug/:slug', async(req, res) => {
    const mousepad = await Mousepad.findOne({ slug: req.params.slug }).populate('moupadreviews');
    if (mousepad) {
        res.send(mousepad);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
mousepadRouter.get('/:id', async(req, res) => {
    const mousepad = await Mousepad.findById(req.params.id);
    if (mousepad) {
        res.send(mousepad);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = mousepadRouter;