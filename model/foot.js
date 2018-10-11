const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const footschema = new mongoose.Schema({
    name :String,
    description : String,
    imageURL : String,
    price : Number,
    date : {
        type : Date,
        default : Date.now
    }
});
footschema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Footwear', footschema);