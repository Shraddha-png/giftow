const express = require('express');
const Acrylic_photo_frame = require('../models/acrylic_photo_frameModel');

const acrylic_photoprintsRouter = express.Router();

acrylic_photoprintsRouter.get('/',async (req, res) =>{
    const acrylic_photoprints = await Acrylic_photo_frame.find();
    res.send(acrylic_photoprints);
});

acrylic_photoprintsRouter.get('/slug/:slug', async(req, res) => {
    const acrylic_photoprint = await Acrylic_photo_frame.findOne({ slug: req.params.slug }).populate('acrphframereviews');
    if (acrylic_photoprint) {
        res.send(acrylic_photoprint);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
acrylic_photoprintsRouter.get('/:id', async(req, res) => {
    const acrylic_photoprint = await Acrylic_photo_frame.findById(req.params.id);
    if (acrylic_photoprint) {
        res.send(acrylic_photoprint);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = acrylic_photoprintsRouter;
