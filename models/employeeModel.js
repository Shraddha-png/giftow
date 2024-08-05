const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   firstName: {
       type: String,
       required: true
   },
   lastName: {
       type: String,
       required: true
   },
   number: {
       type: String,
       required: true
   },
   email: {
       type: String,
       required: true,
       unique: true
   },
   password: {
       type: String,
       required: true
   },
   company: {
       type: String,
       required: true
   },
   business: {
       type: String,
       required: true
   },
   city: {
       type: String,
       required: true
   },
   country: {
       type: String,
       required: true
   }
});

const User = mongoose.model("users", UserSchema);

module.exports = User;



