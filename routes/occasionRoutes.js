const express = require('express');
const Occasion = require('../models/occasionModel');

const occasionRouter = express.Router();

occasionRouter.get('/',async (req, res) =>{
    const occasions = await Occasion.find();
    res.send(occasions);
});

occasionRouter.get('/slug/:slug', async(req, res) => {
    const occasion = await Occasion.findOne({ slug: req.params.slug }).populate('occasionreviews');
    if (occasion) {
        res.send(occasion);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
occasionRouter.get('/:id', async(req, res) => {
    const occasion = await Occasion.findById(req.params.id);
    if (occasion) {
        res.send(occasion);  

        
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = occasionRouter;