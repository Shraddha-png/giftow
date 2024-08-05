const express = require('express');

const Tshirt = require('../models/tshirtsModel')

const tshirtRouter = express.Router();

// Get all T-shirts
tshirtRouter.get('/', async (req, res) => {
    const tshirts = await Tshirt.find();
    res.send(tshirts);
});

// Get T-shirt by slug
tshirtRouter.get('/slug/:slug', async (req, res) => {
    const tshirt = await Tshirt.findOne({ slug: req.params.slug }).populate('treviews');
    if (tshirt) {
        res.send(tshirt);
    } else {
        res.status(404).send({ message: 'T-shirt Not Found' });
    }
});

// Get T-shirt by ID
tshirtRouter.get('/:id', async (req, res) => {
    try {
            const tshirt = await Tshirt.findById(req.params.id);
            if (tshirt) {
             res.send(tshirt);
            } else {
        res.status(404).send({ message: 'T-shirt Not Found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    
});

module.exports = tshirtRouter;