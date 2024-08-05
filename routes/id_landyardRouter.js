const express = require('express');
const Id_landyard = require('../models/id_landyardModel');

const id_landyardRouter = express.Router();

id_landyardRouter.get('/',async (req, res) =>{
    const id_landyards = await Id_landyard.find();
    res.send(id_landyards);
});

id_landyardRouter.get('/slug/:slug', async(req, res) => {
    const id_landyard = await Id_landyard.findOne({ slug: req.params.slug }).populate('id_laynyardreviews');
    if (id_landyard) {
        res.send(id_landyard);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
id_landyardRouter.get('/:id', async(req, res) => {
    const id_landyard = await Id_landyard.findById(req.params.id);
    if (id_landyard) {
        res.send(id_landyard);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = id_landyardRouter;