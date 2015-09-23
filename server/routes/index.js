var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var linkedin = require('../auth/linkedin');
var github = require('../auth/github');
var passport = require('passport');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Please Login' });
});

router.get('/auth/linkedin',
  passport.authenticate('linkedin'));

router.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/' }),
  function(req, res) {
    res.json(req.user);
  });

router.get('/auth/github',
  github.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/auth/github/callback',
  github.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/account');
  });

function ensureAuthenticated(req, res, next){
  console.log(req);
  if (req.isAuthenticated())
    return next();
  else
    res.json('NO YOU\'RE BLOODY WELL NOT!!!');
  }

  router.get('/account', ensureAuthenticated, function(req, res) {
    res.render('index', {title : 'you can only see this if you\'re authenticated'});
  });

module.exports = router;
