const express = require('express');
const Calenders = require('../models/calenderModel');

const calenderRouter = express.Router();

calenderRouter.get('/',async (req, res) =>{
    const calenders = await Calenders.find();
    res.send(calenders);
});

calenderRouter.get('/slug/:slug', async(req, res) => {
    const calender = await Calenders.findOne({ slug: req.params.slug }).populate('calenderreviews');
    if (calender) {
        res.send(calender);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
calenderRouter.get('/:id', async(req, res) => {
    const calender = await Calenders.findById(req.params.id);
    if (calender) {
        res.send(calender);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = calenderRouter;