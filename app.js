const express = require('express');
const mongoose=require('mongoose');
const bodyparser = require("body-parser");
const port = process.env.PORT || 8080;
const routes = require('./routes/routes');
mongoose.connect('mongodb://localhost/e-commerce',{ useNewUrlParser: true })
const session = require('express-session');
//requires model with passport-local mongoose plugged In
User = require('./model/user');
passport = require('passport');
const ejs = require('ejs');
const app = express();
app.set('view engine','ejs');
// createStrategy for authentication
app.use(bodyparser.urlencoded({extended : true}));
app.use(express.static('public'));
app.use('/', routes);
app.listen(port, (req, res)=>{
    console.log(" Server running on port 8080 ");
});