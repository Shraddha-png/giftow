const express = require('express');
const Rubikcubs = require('../models/rubikcubeModel');

const rubikcubRouter = express.Router();

rubikcubRouter.get('/',async (req, res) =>{
    const rubikcubs = await Rubikcubs.find();
    res.send(rubikcubs);
});

rubikcubRouter.get('/slug/:slug', async(req, res) => {
    const rubikcub = await Rubikcubs.findOne({ slug: req.params.slug }).populate('cubereviews');
    if (rubikcub) {
        res.send(rubikcub);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
rubikcubRouter.get('/:id', async(req, res) => {
    const rubikcub = await Rubikcubs.findById(req.params.id);
    if (rubikcub) {
        res.send(rubikcub);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = rubikcubRouter;