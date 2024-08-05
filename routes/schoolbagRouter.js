const express = require('express');
const Schoolbag = require('../models/schoolbagsModel');

const schoolbagRouter = express.Router();

schoolbagRouter.get('/',async (req, res) =>{
    const schoolbags = await Schoolbag.find();
    res.send(schoolbags);
});

schoolbagRouter.get('/slug/:slug', async(req, res) => {
    const schoolbag = await Schoolbag.findOne({ slug: req.params.slug }).populate('schoolbagreviews');
    if (schoolbag) {
        res.send(schoolbag);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
schoolbagRouter.get('/:id', async(req, res) => {
    const schoolbag = await Schoolbag.findById(req.params.id);
    if (schoolbag) {
        res.send(schoolbag);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = schoolbagRouter;
