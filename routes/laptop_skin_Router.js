const express = require('express');
const Laptop_skin = require('../models/laptopskinModel');

const laptop_skinRouter = express.Router();

laptop_skinRouter.get('/',async (req, res) =>{
    const laptop_skins = await Laptop_skin.find();
    res.send(laptop_skins);
});

laptop_skinRouter.get('/slug/:slug', async(req, res) => {
    const laptop_skin = await Laptop_skin.findOne({ slug: req.params.slug }).populate('laptopSkinreviews');
    if (laptop_skin) {
        res.send(laptop_skin);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
laptop_skinRouter.get('/:id', async(req, res) => {
    const laptop_skin = await Laptop_skin.findById(req.params.id);
    if (laptop_skin) {
        res.send(laptop_skin);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = laptop_skinRouter;
