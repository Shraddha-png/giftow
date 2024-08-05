const express = require('express');
const Totebag = require('../models/totebagModel');

const totebagRouter = express.Router();

totebagRouter.get('/',async (req, res) =>{
    const jtotebags = await Totebag.find();
    res.send(jtotebags);
});

totebagRouter.get('/slug/:slug', async(req, res) => {
    const totebag = await Totebag.findOne({ slug: req.params.slug }).populate('totebagreviews');
    if (totebag) {
        res.send(totebag);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
totebagRouter.get('/:id', async(req, res) => {
    const totebag = await Totebag.findById(req.params.id);
    if (totebag) {
        res.send(totebag);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = totebagRouter;