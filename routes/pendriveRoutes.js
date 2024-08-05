const express = require('express');
const Pendrive = require('../models/pendriveModel');

const pendriveRouter = express.Router();

pendriveRouter.get('/',async (req, res) =>{
    const pendrives = await Pendrive.find();
    res.send(pendrives);
});

pendriveRouter.get('/slug/:slug', async(req, res) => {
    const pendrive = await Pendrive.findOne({ slug: req.params.slug }).populate('pendrivereviews');
    if (pendrive) {
        res.send(pendrive);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
pendriveRouter.get('/:id', async(req, res) => {
    const pendrive = await Pendrive.findById(req.params.id);
    if (pendrive) {
        res.send(pendrive);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = pendriveRouter;