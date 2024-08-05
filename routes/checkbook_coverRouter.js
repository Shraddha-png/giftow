const express = require('express');
const Chechbook_Cover = require('../models/checkbook_coverModel');

const checkbook_coverRouter = express.Router();

checkbook_coverRouter.get('/',async (req, res) =>{
    const checkbook_covers = await Chechbook_Cover.find();
    res.send(checkbook_covers);
});

checkbook_coverRouter.get('/slug/:slug', async(req, res) => {
    const checkbook_cover = await Chechbook_Cover.findOne({ slug: req.params.slug }).populate('checkbookcoverreviews');
    if (checkbook_cover) {
        res.send(checkbook_cover);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
checkbook_coverRouter.get('/:id', async(req, res) => {
    const checkbook_cover = await Chechbook_Cover.findById(req.params.id);
    if (checkbook_cover) {
        res.send(checkbook_cover);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = checkbook_coverRouter;
