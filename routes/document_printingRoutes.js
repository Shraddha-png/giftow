const express = require('express');
const Document_printing = require('../models/document_printingModel');

const document_printingRouter = express.Router();

document_printingRouter.get('/',async (req, res) =>{
    const document_printings = await Document_printing.find();
    res.send(document_printings);
});

document_printingRouter.get('/slug/:slug', async(req, res) => {
    const document_printing = await Document_printing.findOne({ slug: req.params.slug }).populate('docprireviews');
    if (document_printing) {
        res.send(document_printing);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
document_printingRouter.get('/:id', async(req, res) => {
    const document_printing = await Document_printing.findById(req.params.id);
    if (document_printing) {
        res.send(document_printing);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = document_printingRouter;