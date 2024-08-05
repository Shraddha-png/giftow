const express = require('express');
const Stamp = require('../models/stampModel');

const stampRouter = express.Router();

stampRouter.get('/',async (req, res) =>{
    const stamps = await Stamp.find();
    res.send(stamps);
});

stampRouter.get('/slug/:slug', async(req, res) => {
    const stamp = await Stamp.findOne({ slug: req.params.slug }).populate('stampreviews');
    if (stamp) {
        res.send(stamp);stamp
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
stampRouter.get('/:id', async(req, res) => {
    const stamp = await Stamp.findById(req.params.id);
    if (stamp) {
        res.send(stamp);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = stampRouter;