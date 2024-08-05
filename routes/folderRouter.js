const express = require('express');
const Folder = require('../models/folderModel');

const folderRouter = express.Router();

folderRouter.get('/',async (req, res) =>{
    const folders = await Folder.find();
    res.send(folders);
});

folderRouter.get('/slug/:slug', async(req, res) => {
    const folder = await Folder.findOne({ slug: req.params.slug }).populate('folderreviews');
    if (folder) {
        res.send(folder);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
folderRouter.get('/:id', async(req, res) => {
    const folder = await Folder.findById(req.params.id);
    if (folder) {
        res.send(folder);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = folderRouter;