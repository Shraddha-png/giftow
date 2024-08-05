const express = require('express');
const NoteDir = require('../models/notedirModel');

const notedirRouter = express.Router();

notedirRouter.get('/',async (req, res) =>{
    const notedirs = await NoteDir.find();
    res.send(notedirs);
});

notedirRouter.get('/slug/:slug', async(req, res) => {
    const notedir = await NoteDir.findOne({ slug: req.params.slug }).populate('notedirreviews');
    if (notedir) {
        res.send(notedir);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
notedirRouter.get('/:id', async(req, res) => {
    const notedir = await NoteDir.findById(req.params.id);
    if (notedir) {
        res.send(notedir);  

        
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = notedirRouter;