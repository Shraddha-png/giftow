const express = require('express');
const Printing = require('../models/printingModel');

const printingRouter = express.Router();

printingRouter.get('/',async (req, res) =>{
    const printings = await Printing.find();
    res.send(printings);
});

printingRouter.get('/slug/:slug', async(req, res) => {
    const printing = await Printing.findOne({ slug: req.params.slug }).populate('printreviews');
    if (printing) {
        res.send(printing);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
printingRouter.get('/:id', async(req, res) => {
    const printing = await Printing.findById(req.params.id);
    if (printing) {
        res.send(printing);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = printingRouter;