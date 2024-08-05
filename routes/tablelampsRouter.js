const express = require('express');
const Tablelamp = require('../models/tablelampsModel');

const tablelampRouter = express.Router();

tablelampRouter.get('/',async (req, res) =>{
    const tablelamps = await Tablelamp.find();
    res.send(tablelamps);
});

tablelampRouter.get('/slug/:slug', async(req, res) => {
    const tablelamp = await Tablelamp.findOne({ slug: req.params.slug }).populate('tbllampreviews');
    if (tablelamp) {
        res.send(tablelamp);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
tablelampRouter.get('/:id', async(req, res) => {
    const tablelamp = await Tablelamp.findById(req.params.id);
    if (tablelamp) {
        res.send(tablelamp);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = tablelampRouter;