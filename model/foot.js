const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const footschema = new mongoose.Schema({
    name :{type:String,dropDups:true},
    description : String,
    imageURL : String,
    price : Number,
    date : {
        type : Date,
        default : Date.now
    }
});
footschema.plugin(uniqueValidator);
footschema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Footwear', footschema);