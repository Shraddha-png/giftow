const express = require('express');
const Diary = require('../models/diaryModel');

const diaryRouter = express.Router();

diaryRouter.get('/',async (req, res) =>{
    const diaries = await Diary.find();
    res.send(diaries);
});

diaryRouter.get('/slug/:slug', async(req, res) => {
    const diary = await Diary.findOne({ slug: req.params.slug }).populate('direviews');
    if (diary) {
        res.send(diary);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
diaryRouter.get('/:id', async(req, res) => {
    const diary = await Diary.findById(req.params.id);
    if (diary) {
        res.send(diary);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = diaryRouter;