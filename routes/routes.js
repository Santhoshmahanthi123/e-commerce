const express = require('express');
const router = express.Router();
router.get('/home', (req, res, next) => {
    res.render('home');
});
router.get('/', (req, res, next) => {
    res.render('app');
});



router.get('/register', (req, res, next) => {
    res.render('register');
});

router.post('/register', (req, res, next) =>{
    const user = req.body.user;
    User.create(user, (err, newUser) => {
        if(err){
            res.render('register');
        } else {
            res.redirect('/home');
        }
    });
});


router.get('/login', (req, res, next) => {
    res.render('login');
});
router.get('/login', (req, res, next) => {
   res.render('login');
});


//logout user
router.get('/logout',(req,res)=>{
   
    res.send("Successfully logged out")
   
})

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