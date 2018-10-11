const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const cloathschema = new mongoose.Schema({
    name :String,
    description : String,
    imageURL : String,
    price : Number,
    date : {
        type : Date,
        default : Date.now
    }
});
cloathschema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Cloath', cloathschema);