const express = require('express');
const Power_Bank = require('../models/power_bankModel');

const power_bankRouter = express.Router();

power_bankRouter.get('/',async (req, res) =>{
    const power_banks = await Power_Bank.find();
    res.send(power_banks);
});

power_bankRouter.get('/slug/:slug', async(req, res) => {
    const power_bank = await Power_Bank.findOne({ slug: req.params.slug }).populate('powerbankreviews');
    if (power_bank) {
        res.send(power_bank);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
power_bankRouter.get('/:id', async(req, res) => {
    const power_bank = await Power_Bank.findById(req.params.id);
    if (power_bank) {
        res.send(power_bank);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = power_bankRouter;