const express = require('express');
const Annual_Report = require('../models/annual_reportModel');

const annual_ReportRouter = express.Router();

annual_ReportRouter.get('/',async (req, res) =>{
    const training_mannuals = await Annual_Report.find();
    res.send(training_mannuals);
});

annual_ReportRouter.get('/slug/:slug', async(req, res) => {
    const annual_Report = await Annual_Report.findOne({ slug: req.params.slug }).populate('annualrepreviews');
    if (annual_Report) {
        res.send(annual_Report);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
annual_ReportRouter.get('/:id', async(req, res) => {
    const annual_Report = await Annual_Report.findById(req.params.id);
    if (annual_Report) {
        res.send(annual_Report);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = annual_ReportRouter;