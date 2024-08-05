const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { sendEmail } = require('../utils');
const router = express.Router();

router.post('/forgotPassword', expressAsyncHandler(async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "You are not registered!",
      });
    }

    const token = crypto.randomBytes(20).toString('hex');
    const resetToken = crypto.createHash('sha256').update(token).digest('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/resetPassword?id=${user._id}&token=${resetToken}`;
    const message = `We have received a request to reset your password. Please reset your password using the link below: ${resetUrl}`;

    await sendEmail({
      to: user.email,
      subject: 'Forgot Password Link',
      text: message
    });

    res.json({
      success: true,
      message: 'A password reset link has been sent to your email.',
    });

  } catch (err) {
    console.error('Error in forgotPassword route:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
  }
}));

router.post('/resetPassword', expressAsyncHandler(async (req, res) => {
  try {
    const { password, token, userId } = req.body;
    const user = await User.findOne({
      _id: userId,
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token!',
      });
    }

    user.password = bcrypt.hashSync(password, 10);
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.json({
      success: true,
      message: 'Your password has been reset successfully!',
    });

  } catch (err) {
    console.error('Error in resetPassword route:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}));

module.exports = router;
