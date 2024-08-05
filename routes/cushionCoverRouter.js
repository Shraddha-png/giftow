const express = require('express');
const Cushion_covers = require('../models/Cushion_coverModel');

const cushion_coverRouter = express.Router();

cushion_coverRouter.get('/',async (req, res) =>{
    const cushion_covers = await Cushion_covers.find();
    res.send(cushion_covers);
});

cushion_coverRouter.get('/slug/:slug', async(req, res) => {
    const cushion_cover = await Cushion_covers.findOne({ slug: req.params.slug }).populate('cushionCoverreviews');
    if (cushion_cover) {
        res.send(cushion_cover);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
cushion_coverRouter.get('/:id', async(req, res) => {
    const cushion_cover = await Cushion_covers.findById(req.params.id);
    if (cushion_cover) {
        res.send(cushion_cover);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = cushion_coverRouter;