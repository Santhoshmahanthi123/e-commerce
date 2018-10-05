const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const userschema = new mongoose.Schema({
    username : String,
    password : String,
    email : String,
    date : {
        type : Date,
        default : Date.now
    }
});

userschema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userschema);