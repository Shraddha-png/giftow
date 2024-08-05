const express = require('express');
const Cushion = require('../models/cushionModel');

const cushionRouter = express.Router();

cushionRouter.get('/',async (req, res) =>{
    const cushions = await Cushion.find();
    res.send(cushions);
});

cushionRouter.get('/slug/:slug', async(req, res) => {
    const cushion = await Cushion.findOne({ slug: req.params.slug }).populate('cushionreviews');
    if (cushion) {
        res.send(cushion);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
cushionRouter.get('/:id', async(req, res) => {
    const cushion = await Cushion.findById(req.params.id);
    if (cushion) {
        res.send(cushion);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = cushionRouter;