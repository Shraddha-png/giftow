const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const Feedback = require('../models/feedbackModel'); // Ensure the path is correct

const feedbackRouter = express.Router();

feedbackRouter.post(
    '/',
    expressAsyncHandler(async (req, res) => {
        const { fname, lname, number, email, feedback } = req.body;
        console.log('Received data:', { fname, lname, number, email, feedback });

        const newFeedback = new Feedback({ fname, lname, number, email, feedback });

        try {
            const savedFeedback = await newFeedback.save();
            console.log('Feedback saved successfully:', savedFeedback);
            res.status(201).send(savedFeedback);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error saving feedback to database', error: error.message });
        }
    })
);

module.exports = feedbackRouter;
