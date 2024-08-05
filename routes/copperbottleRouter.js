const express = require('express');
const Copperbottle = require('../models/copperbottleModel');

const copperbottleRouter = express.Router();

copperbottleRouter.get('/',async (req, res) =>{
    const copperbottles = await Copperbottle.find();
    res.send(copperbottles);
});

copperbottleRouter.get('/slug/:slug', async(req, res) => {
    const copperbottle = await Copperbottle.findOne({ slug: req.params.slug }).populate('acopersipreviews');
    if (copperbottle) {
        res.send(copperbottle);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
copperbottleRouter.get('/:id', async(req, res) => {
    const copperbottle = await Copperbottle.findById(req.params.id);
    if (copperbottle) {
        res.send(copperbottle);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = copperbottleRouter;