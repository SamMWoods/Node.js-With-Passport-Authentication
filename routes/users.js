const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//user model
require('../models/User');
var User= require('mongoose').model('User');

//Login Page
router.get('/login', (req, res) => res.render('login'));

//Register Page
router.get('/register', (req, res) => res.render('register'));

//Register handler
router.post('/register', (req, res) => {
    const { name, password, password2} = req.body;
    let errors = [];

    //check required fields
    if(!name || !password || !password2){
        errors.push({msg: 'Please fill in all fields'});
    }

    //Check password Match
    if(password != password2){
        errors.push({msg: 'Passwords do not match'});
    }

    //Validation password
    if(password.length < 4) {
        errors.push({msg: 'Password should be at least 4 characters'});
    }

    if(errors.length > 0){
        res.render('register', {
            errors,
            name,
            password,
            password2
        })
    }else{
        User.findOne({ name: name }).then(user => {
            if(user){
                //User name already exist
                errors.push({msg: 'Username already exists'})
                res.render('register', {
                    errors,
                    name,
                    password,
                    password2
                });
            } else {
                const newUser = new User({
                    name,
                    password
                });

                //Hashing Password
                bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                       if(err) throw err;
                       
                       //set new Hash Password
                       newUser.password = hash;
                        
                       //Save new user
                       newUser.save()
                       .then(user => {
                            req.flash('success_msg', 'You are now registered and can log in');
                            res.redirect('/users/login')
                       })
                       .catch(err => console.log(err));
                }))
                }
            });
        }
});

// Login handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });

// Logout handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });

module.exports = router;