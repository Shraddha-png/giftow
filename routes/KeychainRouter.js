const express = require('express');
const Keychain = require('../models/keychainModel');

const keychainRouter = express.Router();

keychainRouter.get('/',async (req, res) =>{
    const keychains = await Keychain.find();
    res.send(keychains);
});

keychainRouter.get('/slug/:slug', async(req, res) => {
    const keychain = await Keychain.findOne({ slug: req.params.slug }).populate('keychainreviews');
    if (keychain) {
        res.send(keychain);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
keychainRouter.get('/:id', async(req, res) => {
    const keychain = await Keychain.findById(req.params.id);
    if (keychain) {
        res.send(keychain);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = keychainRouter;