const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// create schema
const UserSchema = new Schema({
    name:{
        type: String,
        required : true
    },
    email :{
        type : String,
        required : true
    }, 
})

//ideas=creates our model and connected to idea schema 
mongoose.model("user",UserSchema);