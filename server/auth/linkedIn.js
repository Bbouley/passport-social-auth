var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin');
var User = require('../models/user');
var config = require('../../_config');

passport.use(new LinkedInStrategy({
    consumerKey: config.linkedIn.clientID,
    consumerSecret: config.linkedIn.clientSecret,
    callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback"
  },
  function(token, tokenSecret, profile, done) {

    console.log(arguments);

    var searchQuery = {
      name : profile.displayName
    };

    var updates = {
      name: profile.displayName,
      oauthID : profile.id
    };

    var options = {
      upsert: true
    };

    User.findOneAndUpdate(searchQuery, updates, options, function(err, user){
        if(err){
          return done (err);
        } else {
          return done (null, user);
        }
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

module.exports = passport;
