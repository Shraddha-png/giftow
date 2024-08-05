const express = require('express');
const Shakkerbottle = require('../models/shakerbottleModel.js');

const shakerbottleRouter = express.Router();

shakerbottleRouter.get('/',async (req, res) =>{
    const shakerbottles = await Shakkerbottle.find();
    res.send(shakerbottles);
});

shakerbottleRouter.get('/slug/:slug', async(req, res) => {
    const shakerbottle = await Shakkerbottle.findOne({ slug: req.params.slug }).populate('shakbotreviews');
    if (shakerbottle) {
        res.send(shakerbottle);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
shakerbottleRouter.get('/:id', async(req, res) => {
    const shakerbottle = await Shakkerbottle.findById(req.params.id);
    if (shakerbottle) {
        res.send(shakerbottle);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = shakerbottleRouter;