const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});


passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    (acessToken, refressToken, profile, done) => {
      User.findOne({ googleID: profile.id }).then(user => {
        if (!user) {
          const newUser = new User({
            googleID: profile.id,
          });
          newUser.save().then(user => {
            done(null, user);
          });
        } else {
          done(null, user);
        }
      });
    },
  ),
);

