const express = require('express');
const Certificate = require('../models/certificateModel');

const certificateRouter = express.Router();

certificateRouter.get('/',async (req, res) =>{
    const certificates = await Certificate.find();
    res.send(certificates);
});

certificateRouter.get('/slug/:slug', async(req, res) => {
    const certificate = await Certificate.findOne({ slug: req.params.slug }).populate('certificatereviews');
    if (certificate) {
        res.send(certificate);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
certificateRouter.get('/:id', async(req, res) => {
    const certificate = await Certificate.findById(req.params.id);
    if (certificate) {
        res.send(certificate);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = certificateRouter;
