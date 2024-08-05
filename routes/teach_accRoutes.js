const express = require('express');
const Teach_Acc = require('../models/teachaccModel');

const teach_accRouter = express.Router();

teach_accRouter.get('/',async (req, res) =>{
    const teachaccesories = await Teach_Acc.find();
    res.send(teachaccesories);
});

teach_accRouter.get('/slug/:slug', async(req, res) => {
    const teachaccesorie = await Teach_Acc.findOne({ slug: req.params.slug }).populate('techaccreviews');
    if (teachaccesorie) {
        res.send(teachaccesorie);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
teach_accRouter.get('/:id', async(req, res) => {
    const teachaccesorie = await Teach_Acc.findById(req.params.id);
    if (teachaccesorie) {
        res.send(teachaccesorie);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = teach_accRouter;