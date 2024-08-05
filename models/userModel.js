const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        fname: { type: String, required: true },
        lname: { type: String, required: true },
        number: { type: Number, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        company: { type: String, required: true },
        business: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        isAdmin: { type: Boolean, default: true },
        resetToken: { type: String },
        // resetTokenExpiration: { type: Date },
        resetPasswordToken: { type: String },
        resetPasswordExpires: { type: Date },

        
    },
    {
        timestamps: true,
       
    }
);

// userSchema.methods.matchPassword = async function(enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };




const User = mongoose.model('User', userSchema);

module.exports = User;







