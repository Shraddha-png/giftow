const express = require('express');
const Digitalph_frame = require('../models/digitalphframe_Model');

const digitalphframesRouter = express.Router();

digitalphframesRouter.get('/',async (req, res) =>{
    const digitalphframes = await Digitalph_frame.find();
    res.send(digitalphframes);
});

digitalphframesRouter.get('/slug/:slug', async(req, res) => {
    const digitalphframe = await Digitalph_frame.findOne({ slug: req.params.slug }).populate('digitalphframereviews');
    if (digitalphframe) {
        res.send(digitalphframe);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
digitalphframesRouter.get('/:id', async(req, res) => {
    const digitalphframe = await Digitalph_frame.findById(req.params.id);
    if (digitalphframe) {
        res.send(digitalphframe);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = digitalphframesRouter;
