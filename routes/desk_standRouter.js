const express = require('express');
const Desk_Stand = require('../models/desk_standModel');

const desk_standRouter = express.Router();

desk_standRouter.get('/',async (req, res) =>{
    const desk_stands = await Desk_Stand.find();
    res.send(desk_stands);
});

desk_standRouter.get('/slug/:slug', async(req, res) => {
    const desk_stand = await Desk_Stand.findOne({ slug: req.params.slug }).populate('deskstandreviews');
    if (desk_stand) {
        res.send(desk_stand);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
desk_standRouter.get('/:id', async(req, res) => {
    const desk_stand = await Desk_Stand.findById(req.params.id);
    if (desk_stand) {
        res.send(desk_stand);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = desk_standRouter;