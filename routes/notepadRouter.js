const express = require('express');
const Notepad = require('../models/notepadMdel');

const notepadRouter = express.Router();

notepadRouter.get('/',async (req, res) =>{
    const notepads = await Notepad.find();
    res.send(notepads);
});

notepadRouter.get('/slug/:slug', async(req, res) => {
    const notepad = await Notepad.findOne({ slug: req.params.slug }).populate('notepadreviews');
    if (notepad) {
        res.send(notepad);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
notepadRouter.get('/:id', async(req, res) => {
    const notepad = await Notepad.findById(req.params.id);
    if (notepad) {
        res.send(notepad);  

        
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = notepadRouter;