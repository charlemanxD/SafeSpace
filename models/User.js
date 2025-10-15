const mongoose = require('mongoose');

// 'USER' Data Structure(skeleton)
const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    hashedPassword: { type: String, required: true },
    pseudonymID: { type: String, unique: true, required: true },
    status: { type: String },
},  { timestamps: true });

//  Creatimg the actual model 
const User = mongoose.model('User', userSchema);

module.exports = User;