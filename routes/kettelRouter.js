const express = require('express');
const Kettle = require('../models/kettleModel');

const kettelRouter = express.Router();

kettelRouter.get('/',async (req, res) =>{
    const kettles = await Kettle.find();
    res.send(kettles);
});

kettelRouter.get('/slug/:slug', async(req, res) => {
    const kettle = await Kettle.findOne({ slug: req.params.slug }).populate('ktlreviews');
    if (kettle) {
        res.send(kettle);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
kettelRouter.get('/:id', async(req, res) => {
    const kettle = await Kettle.findById(req.params.id);
    if (kettle) {
        res.send(kettle);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = kettelRouter;