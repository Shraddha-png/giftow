const express = require('express');
const Award = require('../models/awardModel');

const awardRouter = express.Router();

awardRouter.get('/',async (req, res) =>{
    const awards = await Award.find();
    res.send(awards);
});

awardRouter.get('/slug/:slug', async(req, res) => {
    const award = await Award.findOne({ slug: req.params.slug }).populate('areviews');
    if (award) {
        res.send(award);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
awardRouter.get('/:id', async(req, res) => {
    const award = await Award.findById(req.params.id);
    if (award) {
        res.send(award);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = awardRouter;