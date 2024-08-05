const express = require('express');
const Paper_mug = require('../models/paper_mugModel');

const paper_mugRouter = express.Router();

paper_mugRouter.get('/',async (req, res) =>{
    const paper_mugs = await Paper_mug.find();
    res.send(paper_mugs);
});

paper_mugRouter.get('/slug/:slug', async(req, res) => {
    const paper_mug = await Paper_mug.findOne({ slug: req.params.slug }).populate('pmugreviews');
    if (paper_mug) {
        res.send(paper_mug);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
paper_mugRouter.get('/:id', async(req, res) => {
    const paper_mug = await Paper_mug.findById(req.params.id);
    if (paper_mug) {
        res.send(paper_mug);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = paper_mugRouter;