const express = require('express');
const Clothing = require('../models/clothingModel.js');

const clothingRouter = express.Router();

clothingRouter.get('/',async (req, res) =>{
    const clothings = await Clothing.find();
    res.send(clothings);
});

clothingRouter.get('/slug/:slug', async(req, res) => {
    const clothing = await Clothing.findOne({ slug: req.params.slug }).populate('clothreviews');
    if (clothing) {
        res.send(clothing);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
clothingRouter.get('/:id', async(req, res) => {
    const clothing = await Clothing.findById(req.params.id);
    if (clothing) {
        res.send(clothing);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = clothingRouter;