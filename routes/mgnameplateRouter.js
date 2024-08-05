const express = require('express');
const Mgnameplate = require('../models/mgnameplateModel');

const mgnameplateRouter = express.Router();

mgnameplateRouter.get('/',async (req, res) =>{
    const mgnameplates = await Mgnameplate.find();
    res.send(mgnameplates);
});

mgnameplateRouter.get('/slug/:slug', async(req, res) => {
    const mgnameplate = await Mgnameplate.findOne({ slug: req.params.slug }).populate('mgnmplatereviews');
    if (mgnameplate) {
        res.send(mgnameplate);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
mgnameplateRouter.get('/:id', async(req, res) => {
    const mgnameplate = await Mgnameplate.findById(req.params.id);
    if (mgnameplate) {
        res.send(mgnameplate);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = mgnameplateRouter;