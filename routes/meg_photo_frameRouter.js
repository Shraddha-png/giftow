const express = require('express');
const Magnetic_photoframe = require('../models/meg_photo_frameModel');

const magnetic_photoframeRouter = express.Router();

magnetic_photoframeRouter.get('/',async (req, res) =>{
    const magnetic_photoframes = await Magnetic_photoframe.find();
    res.send(magnetic_photoframes);
});

magnetic_photoframeRouter.get('/slug/:slug', async(req, res) => {
    const magnetic_photoframe = await Magnetic_photoframe.findOne({ slug: req.params.slug }).populate('mgphframreviews');
    if (magnetic_photoframe) {
        res.send(magnetic_photoframe);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
magnetic_photoframeRouter.get('/:id', async(req, res) => {
    const magnetic_photoframe = await Magnetic_photoframe.findById(req.params.id);
    if (magnetic_photoframe) {
        res.send(magnetic_photoframe);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = magnetic_photoframeRouter;