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
mongoose.connect('mongodb://localhost/e-commerce',{ useNewUrlParser: true })
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

app.get('/register', (req, res, next) => {
    res.render('register');
});


// app.post('/register', (req, res, next) =>{
//     const user = req.body.user;
//     User.create(user, (err, newUser) => {
//         if(err){
//             res.render('register');
//         }
       
//             passport.authenticate("local")(req,res,()=>{
//              res.redirect("secret");
//              });
//             });
//     });

app.post('/register',(req,res)=>{
    req.body.username
    req.body.password
    User.register(new User({username:req.body.username,email:req.body.email}),req.body.password,(err,user)=>{
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,()=>{
            res.render("login");
        })
    });
});
app.get('/login', (req, res, next) => {
    res.render('login');
 });
 app.post('/login',passport.authenticate("local",{
     successRedirect:"/session",
     failureRedirect:"/login"
 }),(req,res)=>{

 });
app.get('/logout',(req,res)=>{
 req.logout();
 res.redirect('/login')
})
app.get('/session',isLoggedIn,(req,res)=>{
    res.render("session");

})
app.get('/santhosh',isLoggedIn,(req,res)=>{
    res.render("santhosh");

})
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