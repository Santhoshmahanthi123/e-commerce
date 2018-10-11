const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const userschema = new mongoose.Schema({
    username : {type: String, required: true, unique: true, dropDups: true},
    password : String,
    email : String,
    date : {
        type : Date,
        default : Date.now
    }
});
userschema.plugin(uniqueValidator);
userschema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userschema);