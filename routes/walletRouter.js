const express = require('express');
const Wallet = require('../models/walletModel');

const walletRouter = express.Router();

walletRouter.get('/',async (req, res) =>{
    const wallets = await Wallet.find();
    res.send(wallets);
});

walletRouter.get('/slug/:slug', async(req, res) => {
    const wallet = await Wallet.findOne({ slug: req.params.slug }).populate('walletsreviews');
    if (wallet) {
        res.send(wallet);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
walletRouter.get('/:id', async(req, res) => {
    const wallet = await Wallet.findById(req.params.id);
    if (wallet) {
        res.send(wallet);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = walletRouter;