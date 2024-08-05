const express = require('express');
const Home_keychain = require('../models/home_keychModel');

const home_keychainRouter = express.Router();

home_keychainRouter.get('/',async (req, res) =>{
    const home_keychains = await Home_keychain.find();
    res.send(home_keychains);
});

home_keychainRouter.get('/slug/:slug', async(req, res) => {
    const home_keychain = await Home_keychain.findOne({ slug: req.params.slug }).populate('homeKeyreviews');
    if (home_keychain) {
        res.send(home_keychain);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
home_keychainRouter.get('/:id', async(req, res) => {
    const home_keychain = await Home_keychain.findById(req.params.id);
    if (home_keychain) {
        res.send(home_keychain);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = home_keychainRouter;