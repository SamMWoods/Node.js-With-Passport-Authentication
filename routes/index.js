const express = require('express');
const router = express.Router();
const {ensureAuthenticated } = require('../config/auth');

//welcome page
router.get('/', (req, res) => res.render('welcome'));

//dashboard page
router.get('/dashboard', ensureAuthenticated, (req, res) => 
res.render('dashboard',{
    name: req.user.name
}));

//dashboard page
router.get('/rps', ensureAuthenticated, (req, res) => 
res.render('rps',{
    name: req.user.name
}));


module.exports = router;