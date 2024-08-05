const express = require('express');
const Digital_Clock_speaker = require('../models/digitalclock_speakersModel');

const digital_Clock_speakerRouter = express.Router();

digital_Clock_speakerRouter.get('/',async (req, res) =>{
    const digitalclock_speakers = await Digital_Clock_speaker.find();
    res.send(digitalclock_speakers);
});

digital_Clock_speakerRouter.get('/slug/:slug', async(req, res) => {
    const digitalclock_speaker = await Digital_Clock_speaker.findOne({ slug: req.params.slug }).populate('digitalclocspeareviews');
    if (digitalclock_speaker) {
        res.send(digitalclock_speaker);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
    
});
digital_Clock_speakerRouter.get('/:id', async(req, res) => {
    const digitalclock_speaker = await Digital_Clock_speaker.findById(req.params.id);
    if (digitalclock_speaker) {
        res.send(digitalclock_speaker);  
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});

module.exports = digital_Clock_speakerRouter;