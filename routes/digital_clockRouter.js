const express = require('express');
const Digital_Clock = require('../models/digitalclockModels');

const digitalclockRouter = express.Router();

digitalclockRouter.get('/',async (req, res) =>{
    const digitalclocks = await Digital_Clock.find();
    res.send(digitalclocks);
});

digitalclockRouter.get('/slug/:slug', async(req, res) => {
    const digitalclock = await Digital_Clock.findOne({ slug: req.params.slug }).populate('digitlclockreviews');
    if (digitalclock) {
        res.send(digitalclock);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
digitalclockRouter.get('/:id', async(req, res) => {
    const digitalclock = await Digital_Clock.findById(req.params.id);
    if (digitalclock) {
        res.send(digitalclock);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = digitalclockRouter;
