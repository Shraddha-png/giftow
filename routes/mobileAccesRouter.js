const express = require('express');
const Mobile_accessories = require('../models/mobileaccessoriesModel');

const mobile_accessorieRouter = express.Router();

mobile_accessorieRouter.get('/',async (req, res) =>{
    const mobile_accessories = await Mobile_accessories.find();
    res.send(mobile_accessories);
});

mobile_accessorieRouter.get('/slug/:slug', async(req, res) => {
    const mobile_accessorie = await Mobile_accessories.findOne({ slug: req.params.slug }).populate('mobileAccreviews');
    if (mobile_accessorie) {
        res.send(mobile_accessorie);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
mobile_accessorieRouter.get('/:id', async(req, res) => {
    const mobile_accessorie = await Mobile_accessories.findById(req.params.id);
    if (mobile_accessorie) {
        res.send(mobile_accessorie);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = mobile_accessorieRouter;
