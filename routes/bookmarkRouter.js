const express = require('express');
const Bookmarks = require('../models/bookmarkModel');

const bookmarkRouter = express.Router();

bookmarkRouter.get('/',async (req, res) =>{
    const bookmarks = await Bookmarks.find();
    res.send(bookmarks);
});

bookmarkRouter.get('/slug/:slug', async(req, res) => {
    const bookmark = await Bookmarks.findOne({ slug: req.params.slug }).populate('bookmarkreviews');
    if (bookmark) {
        res.send(bookmark);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
bookmarkRouter.get('/:id', async(req, res) => {
    const bookmark = await Bookmarks.findById(req.params.id);
    if (bookmark) {
        res.send(bookmark);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = bookmarkRouter;