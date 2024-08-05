const express = require('express');
const Shotglass = require('../models/shotglassesModel');

const shotglassRouter = express.Router();

shotglassRouter.get('/',async (req, res) =>{
    const shotglasses = await Shotglass.find();
    res.send(shotglasses);
});

shotglassRouter.get('/slug/:slug', async(req, res) => {
    const shotglass = await Shotglass.findOne({ slug: req.params.slug }).populate('shotglassreviews');
    if (shotglass) {
        res.send(shotglass);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
shotglassRouter.get('/:id', async(req, res) => {
    const shotglass = await Shotglass.findById(req.params.id);
    if (shotglass) {
        res.send(shotglass);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = shotglassRouter;