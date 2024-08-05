const express = require('express');
const Photo_Frame = require('../models/photo_frameModel');

const photoframeRouter = express.Router();

photoframeRouter.get('/',async (req, res) =>{
    const photoframes = await Photo_Frame.find();
    res.send(photoframes);
});

photoframeRouter.get('/slug/:slug', async(req, res) => {
    const photoframe = await Photo_Frame.findOne({ slug: req.params.slug }).populate('phframereviews');
    if (photoframe) {
        res.send(photoframe);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
photoframeRouter.get('/:id', async(req, res) => {
    const photoframe = await Photo_Frame.findById(req.params.id);
    if (photoframe) {
        res.send(photoframe);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = photoframeRouter;