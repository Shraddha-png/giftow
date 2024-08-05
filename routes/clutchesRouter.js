const express = require('express');
const Clutches = require('../models/clutchesModel');

const clutcheRouter = express.Router();

clutcheRouter.get('/',async (req, res) =>{
    const clutches = await Clutches.find();
    res.send(clutches);
});

clutcheRouter.get('/slug/:slug', async(req, res) => {
    const clutche = await Clutches.findOne({ slug: req.params.slug }).populate('clutchesreviews');
    if (clutche) {
        res.send(clutche);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
clutcheRouter.get('/:id', async(req, res) => {
    const clutche = await Clutches.findById(req.params.id);
    if (clutche) {
        res.send(clutche);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = clutcheRouter;
