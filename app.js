require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
const passport = require("passport");
const User = require('./model/user');
const port = process.env.PORT || 8080;
const routes = require('./routes/routes');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const passportLocalMongoose = require("passport-local-mongoose"); 
console.log('@@@@@@@@@@@@@@@@',process.env.DBUSER,process.env.DBPASSWORD);
mongoose.connect('mongodb://'+process.env.DBUSER+':'+process.env.DBPASSWORD+'@ds033865.mlab.com:33865/e-commerce',{ useNewUrlParser: true });
//requires model with passport-local mongoose plugged In
const ejs = require('ejs');
const app = express();

app.use(bodyparser.urlencoded({extended : true}));

app.set('view engine','ejs');

app.use(require("express-session")({
    secret:"Sessions are interesting to learn",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.post('/register',(req,res)=>{
    req.body.username
    req.body.password
    User.register(new User({username:req.body.username,email:req.body.email}),req.body.password,(err,user)=>{
        if(err){
            console.log(err);
            res.sendStatus(501)
        }
        passport.authenticate("local")(req,res,()=>{
            res.sendStatus(200);
        })
    });
});
 app.get('/login',passport.authenticate("local",{
     successRedirect:"/loginSuccess",
     failureRedirect:"/loginFailure"
 }),(req,res)=>{
 });
app.get('/logout',(req,res)=>{
 req.logout();
 res.sendStatus(200);
//  res.redirect('/login')
})
app.get('/loginSuccess',isLoggedIn,(req,res)=>{
    res.json(req.user);
})
app.get('/loginFailure',isLoggedIn,(req,res)=>{
    res.sendStatus(404);
})
app.get('/santhosh',isLoggedIn,(req,res)=>{
    res.render("santhosh");

})
app.get('/users',(req,res)=>{
    User.find().then((data)=>{
        res.json(data)
    }).catch((err)=>{
        console.log(err);
        res.statusCode(501);
    })
})
app.get('/Food', (req, res, next) => {
    res.json({'msg':'welcome to food route!'});
});
app.get('/Cloathing',(req,res)=>{

    res.json({"msg":" Welcome to Cloathing route!"});
});
app.get('/Footwear',(req,res)=>{

    res.json({"msg":" Welcome to Footwear route!"});
});
app.use('/', routes); 
function isLoggedIn(req,res,next)
{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}

app.listen(port, (req, res)=>{
    console.log(" Server running on port 8080 ");
});