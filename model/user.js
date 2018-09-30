const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    username : String,
    email : String,
    password : String,
    password2 : String,
    date : {
        type : Date,
        default : Date.now
    }
});


module.exports = mongoose.model('User', userschema);