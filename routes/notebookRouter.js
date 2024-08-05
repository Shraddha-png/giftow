const express = require('express');
const Notebook = require('../models/notebookModel');

const notebookRouter = express.Router();

notebookRouter.get('/',async (req, res) =>{
    const notebooks = await Notebook.find();
    res.send(notebooks);
});

notebookRouter.get('/slug/:slug', async(req, res) => {
    const notebook = await Notebook.findOne({ slug: req.params.slug }).populate('notebookreviews');
    if (notebook) {
        res.send(notebook);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
notebookRouter.get('/:id', async(req, res) => {
    const notebook = await Notebook.findById(req.params.id);
    if (notebook) {
        res.send(notebook);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = notebookRouter;