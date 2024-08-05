const express = require('express');
const Tag = require('../models/tagModel');

const tagRouter = express.Router();

tagRouter.get('/',async (req, res) =>{
    const tags = await Tag.find();
    res.send(tags);
});

tagRouter.get('/slug/:slug', async(req, res) => {
    const tag = await Tag.findOne({ slug: req.params.slug }).populate('tagreviews');
    if (tag) {
        res.send(tag);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
tagRouter.get('/:id', async(req, res) => {
    const tag = await Tag.findById(req.params.id);
    if (tag) {
        res.send(tag);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = tagRouter;