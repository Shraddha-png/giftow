const express = require('express');
const TrainingMannual = require('../models/training_mannualModel');

const training_mannualRouter = express.Router();

training_mannualRouter.get('/',async (req, res) =>{
    const training_mannuals = await TrainingMannual.find();
    res.send(training_mannuals);
});

training_mannualRouter.get('/slug/:slug', async(req, res) => {
    const training_mannual = await TrainingMannual.findOne({ slug: req.params.slug }).populate('tramanreviews').populate('tramanreviews');
    if (training_mannual) {
        res.send(training_mannual);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
training_mannualRouter.get('/:id', async(req, res) => {
    const training_mannual = await TrainingMannual.findById(req.params.id);
    if (training_mannual) {
        res.send(training_mannual);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = training_mannualRouter;