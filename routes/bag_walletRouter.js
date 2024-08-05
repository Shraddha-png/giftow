const express = require('express');
const Bag_Wallet = require('../models/bag_walletsModel');

const bag_walletRouter = express.Router();

bag_walletRouter.get('/',async (req, res) =>{
    const bags_wallets = await Bag_Wallet.find();
    res.send(bags_wallets);
});

bag_walletRouter.get('/slug/:slug', async(req, res) => {
    const bags_wallet = await Bag_Wallet.findOne({ slug: req.params.slug }).populate('bagwalletreviews');
    if (bags_wallet) {
        res.send(bags_wallet);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
bag_walletRouter.get('/:id', async(req, res) => {
    const bags_wallet = await Bag_Wallet.findById(req.params.id);
    if (bags_wallet) {
        res.send(bags_wallet);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = bag_walletRouter;