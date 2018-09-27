const passport = require('passport');
const express = require('express');
const app = express(),
    LocalStrategy = require('passport-local').Strategy;
    app.use(require('body-parser').urlencoded({ extended: true }));
    app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
 
    app.use(passport.initialize());
    app.use(passport.session());
 
    passport.use(new LocalStrategy(
 
     function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
         if (!user)
         {
                  return done(null, false, { message: 'Incorrect username.' });
         }
 
             if (!user.validPassword(password))
        {
 
                return done(null, false, { message: 'Incorrect password.' });
              }
        return done(null, false, { message: 'Incorrect password.' });
        });
        }
    ));
    passport.serializeUser(function(user, done) {
        done(null, user.id);
     });
      
     passport.deserializeUser(function(id, done) {
        User.findById(id, function (err, user) {
           done(err, user);
        });
     });
     app.post('/login',
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login'})
);