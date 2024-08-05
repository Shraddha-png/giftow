const express = require('express');
const Project_Report = require('../models/project_reportModel');

const project_reportRouter = express.Router();

project_reportRouter.get('/',async (req, res) =>{
    const project_reports = await Project_Report.find();
    res.send(project_reports);
});

project_reportRouter.get('/slug/:slug', async(req, res) => {
    const project_report = await Project_Report.findOne({ slug: req.params.slug }).populate('prorepreviews');
    if (project_report) {
        res.send(project_report);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
project_reportRouter.get('/:id', async(req, res) => {
    const project_report = await Project_Report.findById(req.params.id);
    if (project_report) {
        res.send(project_report);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = project_reportRouter;