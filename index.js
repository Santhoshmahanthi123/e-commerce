const express = require('express');
const app = express();
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');



const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
// require('./config/passport')(passport);
mongoose.connect("mongodb://localhost:27017/user", { useNewUrlParser: true })

.then(() => console.log('mongoDB connected...'))
.catch(err => console.log(err));
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.post('/login',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    //check for user
    users.findOne({email})
    .then(user=>{
        if(!user){
            return res.json({message:'user not found!'});
        }
        //check for password
        bcrypt.compare(password,user.password)
        .then(isMatch=>{
            if(isMatch){
                res.json({msg:'success'});
            }else{
                return res.status(400).json({msg:'password incorrect!'});
            }
        })


    })

})
const port = 3000;
 
app.listen(port,()=>{
    console.log(`server started on ${port}`);
})



