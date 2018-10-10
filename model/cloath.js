const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const cloathschema = new mongoose.Schema({
    name :{type:String,dropDups:true},
    description : String,
    imageURL : String,
    price : Number,
    date : {
        type : Date,
        default : Date.now
    }
});
cloathschema.plugin(uniqueValidator);
cloathschema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Cloath', cloathschema);