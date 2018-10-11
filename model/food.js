const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const foodschema = new mongoose.Schema({
    name :String,
    description : String,
    imageURL : String,
    price : Number,
    date : {
        type : Date,
        default : Date.now
    }
});
foodschema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Food', foodschema);