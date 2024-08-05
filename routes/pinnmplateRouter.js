const express = require('express');
const Pinnmplate = require('../models/pinnmplateModel');

const pinnmplateRouter = express.Router();

pinnmplateRouter.get('/',async (req, res) =>{
    const pinnmplates = await Pinnmplate.find();
    res.send(pinnmplates);
});

pinnmplateRouter.get('/slug/:slug', async(req, res) => {
    const pinnmplate = await Pinnmplate.findOne({ slug: req.params.slug }).populate('pinnmplatereviews');
    if (pinnmplate) {
        res.send(pinnmplate);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
pinnmplateRouter.get('/:id', async(req, res) => {
    const pinnmplate = await Pinnmplate.findById(req.params.id);
    if (pinnmplate) {
        res.send(pinnmplate);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = pinnmplateRouter;