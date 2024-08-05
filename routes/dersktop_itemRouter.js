const express = require('express');
const Desktop_Item = require('../models/desktopitemModel');

const desktopitemRouter = express.Router();

desktopitemRouter.get('/',async (req, res) =>{
    const desktopitems = await Desktop_Item.find();
    res.send(desktopitems);
});

desktopitemRouter.get('/slug/:slug', async(req, res) => {
    const desktopitem = await Desktop_Item.findOne({ slug: req.params.slug }).populate('desktopitemreviews');
    if (desktopitem) {
        res.send(desktopitem);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
desktopitemRouter.get('/:id', async(req, res) => {
    const desktopitem = await Desktop_Item.findById(req.params.id);
    if (desktopitem) {
        res.send(desktopitem);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = desktopitemRouter;