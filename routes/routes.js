const express = require('express');
const router = express.Router();
const passport = require('passport');
const bodyparser = require("body-parser");
const LocalStrategy = require("passport-local");
const bcryptJs = require("bcryptjs");
const User = require('../model/user');
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.get('/Food', (req, res, next) => {
    res.json({'msg':'welcome to food route!'});
});
router.get('/Cloathing',(req,res)=>{

    res.json({"msg":" Welcome to Cloathing route!"});
});
router.get('/Footwear',(req,res)=>{

    res.json({"msg":" Welcome to Footwear route!"});
});
module.exports = router;