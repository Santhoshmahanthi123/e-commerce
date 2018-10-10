require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
const passport = require("passport");
// const multer = require("multer");
const User = require('./model/user');
const Food = require('./model/food');
const Foot = require('./model/foot');
const Cloath = require('./model/cloath');
const port = process.env.PORT || 3000;
const routes = require('./routes/routes');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const passportLocalMongoose = require("passport-local-mongoose"); 
console.log('@@@@@@@@@@@@@@@@',process.env.DBUSER,process.env.DBPASSWORD);
mongoose.connect('mongodb://'+process.env.DBUSER+':'+process.env.DBPASSWORD+'@ds033865.mlab.com:33865/e-commerce',{ useNewUrlParser: true,  useCreateIndex: true, });
//requires model with passport-local mongoose plugged In

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : true}));
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// app.use(require(multer({ dest: "./uploads/",rename:(fieldname, filename,next) =>{
//       return filename;
//     },})));

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
        });
    });
});
app.post('/Food',(req,res)=>{
    Food.create(new Food({name:req.body.name,description:req.body.description,imageURL:req.body.imageURL,price:req.body.price}),(err,food)=>{
        if(err){
            console.log(err);
            res.sendStatus(501)
        }
        else{
            res.sendStatus(200);
        }
    });
});
app.post('/Foot',(req,res)=>{
    Foot.create(new Foot({name:req.body.name,description:req.body.description,imageURL:req.body.imageURL,price:req.body.price}),(err,foot)=>{
        if(err){
            console.log(err);
            res.sendStatus(501)
        }
        else{
            res.sendStatus(200);
        }
    });
});
app.post('/Cloath',(req,res)=>{
    Cloath.create(new Cloath({name:req.body.name,description:req.body.description,imageURL:req.body.imageURL,price:req.body.price}),(err,cloath)=>{
        if(err){
            console.log(err);
            res.sendStatus(501)
        }
        else{
            res.sendStatus(200);
        }
    });
});
 app.get('/login',bodyparser.json(), (req,res)=>{
     const body = JSON.stringify(req.body);
     console.log("#####################$$$$$", req.body)
     console.log("$$$$$$$$$$$$$$$$$$$$$", body)
     res.send("")
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
app.get('/Food',(req,res)=>{
    Food.find().then((data)=>{
        res.json(data);
    }).catch((err)=>{
        console.log(err);
        res.statusCode(501);
    })
})
app.get('/Foot',(req,res)=>{
    Food.find().then((data)=>{
        res.json(data)
    }).catch((err)=>{
        console.log(err);
        res.statusCode(501);
    })
})
app.get('/Cloath',(req,res)=>{
    Cloath.find().then((data)=>{
        res.json(data)
    }).catch((err)=>{
        console.log(err);
        res.statusCode(501);
    })
})

// app.get('/Food', (req, res, next) => {
//     res.json({'msg':'welcome to food route!'});
// });
app.use('/', routes); 
function isLoggedIn(req,res,next)
{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}

app.listen(port, (req, res)=>{
    console.log(" Server running on port 3000 ");
});