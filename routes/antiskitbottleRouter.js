const express = require('express');
const Antiskitbottles = require('../models/antiskitbottleModel');

const antiskitbottleRouter = express.Router();

antiskitbottleRouter.get('/',async (req, res) =>{
    const antiskitbottles = await Antiskitbottles.find();
    res.send(antiskitbottles);
});

antiskitbottleRouter.get('/slug/:slug', async(req, res) => {
    const antiskitbottle = await Antiskitbottles.findOne({ slug: req.params.slug }).populate('antiskitbotreviews');
    if (antiskitbottle) {
        res.send(antiskitbottle);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
antiskitbottleRouter.get('/:id', async(req, res) => {
    const antiskitbottle = await Antiskitbottles.findById(req.params.id);
    if (antiskitbottle) {
        res.send(antiskitbottle);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = antiskitbottleRouter;