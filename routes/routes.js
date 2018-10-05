const express = require('express');
const router = express.Router();
const passport = require('passport');
const bodyparser = require("body-parser");
const LocalStrategy = require("passport-local");
const bcryptJs = require("bcryptjs");
const User = require('../model/user');
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
router.get('/home', (req, res, next) => {
    res.render('home');
});
router.get('/', (req, res, next) => {
    res.render('app');
});
router.get('/app', (req, res, next) => {
    res.render('app');
});
router.post('/search',(req,res)=>{

    res.json({"msg":" Welcome to Search route!"});
});
router.post('/slide',(req,res)=>{

    res.json({"msg":" Welcome to Image slider route!"});
});
router.post('/search',(req,res)=>{

    res.json({"msg":" Welcome to Search route!"});
});
router.post('/deals',(req,res)=>{

    res.json({"msg":" Welcome to deals of the day route!"});
});
router.post('/cart',(req,res)=>{

    res.json({"msg":" Welcome to cart route!"});
});
router.post('/sellers',(req,res)=>{

    res.json({"msg":" Welcome to Sellers route!"});
});
router.post('/pay',(req,res)=>{

    res.json({"msg":" Welcome to payment route!"});
});
module.exports = router;