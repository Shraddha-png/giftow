const express = require('express');
const Best_Seller = require('../models/best_sellerModel');

const best_sellerRouter = express.Router();

best_sellerRouter.get('/',async (req, res) =>{
    const best_sellers = await Best_Seller.find();
    res.send(best_sellers);
});
best_sellerRouter.get('/slug/:slug', async(req, res) => {
    const best_seller = await Best_Seller.findOne({ slug: req.params.slug }).populate('bestSelreviews');
    if (best_seller) {
        res.send(best_seller);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
best_sellerRouter.get('/:id', async(req, res) => {
    const best_seller = await Best_Seller.findById(req.params.id);
    if (best_seller) {
        res.send(best_seller);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = best_sellerRouter;