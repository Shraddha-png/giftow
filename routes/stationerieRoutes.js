const express = require('express');
const Stationeries = require('../models/stationerieModel');

const stationeriesRouter = express.Router();

stationeriesRouter.get('/',async (req, res) =>{
    const stationeries = await Stationeries.find();
    res.send(stationeries);
});

stationeriesRouter.get('/slug/:slug', async(req, res) => {
    const stationeries = await Stationeries.findOne({ slug: req.params.slug }).populate('stationreviews');
    if (stationeries) {
        res.send(stationeries);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
stationeriesRouter.get('/:id', async(req, res) => {
    const stationeries = await Stationeries.findById(req.params.id);
    if (stationeries) {
        res.send(stationeries);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = stationeriesRouter;