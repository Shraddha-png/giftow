const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const nodemailer = require('nodemailer');
const { isAuth, generateToken } = require('../utils');
// const { sendPasswordResetEmail } = require('../sendEmail.js');


const userRouter = express.Router();

userRouter.post(
    '/signin',
    expressAsyncHandler(async (req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id: user._id,
                    // name: user.name,
                    fname: user.fname,
                    lname: user.lname,
                    number: user.number,
                    company: user.company,
                    business: user.business,
                    city: user.city,
                    country: user.country,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user),
                });
                return;
            }
        }
        res.status(401).send({ message: 'Invalid email or password' });
    })
);

userRouter.post(
    '/signup',
    expressAsyncHandler(async (req, res) => {
        const { fname, lname, number, company, business,city, country, email, password } = req.body;
        console.log('Received data:', {  fname, lname, number, company, business, city, country, email, password });

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'User already exists' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({  fname, lname, number, company, business, city, country, email, password: hashedPassword });

        try {
            const user = await newUser.save();
            console.log('User saved successfully:', user);
            res.status(201).send({
                _id: user._id,
                fname: user.fname,
                lname: user.lname,
                number: user.number,
                company: user.company,
                business:user.business,
                city:user.city,
                country: user.country,
                email: user.email,
                password: user.password,
                token: generateToken(user),
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'Error saving user to database', error: error.message });
        }
    })
);

//send email Link and for rese password

// Forgot password route
userRouter.post(
  '/forgot-password',
  expressAsyncHandler(async (req, res) => {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }

      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenHash = bcrypt.hashSync(resetToken, 10);

      user.resetPasswordToken = resetTokenHash;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

      await user.save();

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset Request',
        text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n`
          + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
          + `${resetUrl}\n\n`
          + `If you did not request this, please ignore this email and your password will remain unchanged.\n`
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log('Error sending email:', err.message);
          return res.status(500).send({ message: 'Failed to send email. Please try again later.' });
        } else {
          console.log('Email sent:', info.response);
          return res.status(200).send({ message: 'Password reset email sent successfully.' });
        }
      });

    } catch (error) {
      console.error('Error in forgot-password:', error);
      return res.status(500).send({ message: 'An unexpected error occurred. Please try again later.' });
    }
  })
);

  
  // Reset password route
  userRouter.post(
    '/reset-password/:token',
    expressAsyncHandler(async (req, res) => {
      const { token } = req.params;
      const { password } = req.body;
  
      try {
        const user = await User.findOne({
          resetPasswordToken: { $ne: null },
          resetPasswordExpires: { $gt: Date.now() },
        });
  
        if (!user || !bcrypt.compareSync(token, user.resetPasswordToken)) {
          return res.status(400).send({ message: 'Invalid or expired token' });
        }
  
        user.password = bcrypt.hashSync(password, 10);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
  
        await user.save();
  
        res.send({ message: 'Password reset successfully' });
      } catch (error) {
        console.error('Error in reset-password:', error);
        res.status(500).send({ message: 'An unexpected error occurred. Please try again later.' });
      }
    })
  );

// updated profile

userRouter.put(
    '/profile',
    isAuth,
    expressAsyncHandler(async (req, res)=>{
        const user = await User.findById(req.user._id);
        if (user) {
            user.fname = req.body.fname || user.fname;
            user.lname = req.body.lname || user.lname;
            user.number = req.body.number || user.number;
            user.company = req.body.company || user.company;
            user.business = req.body.business || user.business;
            user.city = req.body.city || user.city;
            user.country = req.body.country || user.country;
            user.email = req.body.email || user.email;
            if(req.body.password) {
                user.password = bcrypt.hashSync(req.body.password, 8)
            }

            const updatedUser = await user.save();
            res.send({

                _id: updatedUser._id,
                fname: updatedUser.fname,
                lname: updatedUser.lname,
                number: updatedUser.number,
                company: updatedUser.company,
                business: updatedUser.business,
                city: updatedUser.city,
                country: updatedUser.country,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser),
            });
        } else {
            res.status(404).send({message:'User Not Found'})
        }
    }
    ) 

    
)

module.exports = userRouter;
