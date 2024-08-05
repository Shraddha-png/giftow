const express = require('express');
const Standee = require('../models/standeeModel');

const stadeeRouter = express.Router();

stadeeRouter.get('/',async (req, res) =>{
    const standees = await Standee.find();
    res.send(standees);
});

stadeeRouter.get('/slug/:slug', async(req, res) => {
    const standee = await Standee.findOne({ slug: req.params.slug }).populate('standeereviews');
    if (standee) {
        res.send(standee);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
stadeeRouter.get('/:id', async(req, res) => {
    const standee = await Standee.findById(req.params.id);
    if (standee) {
        res.send(standee);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = stadeeRouter;