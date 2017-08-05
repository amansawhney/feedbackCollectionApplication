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
    async (acessToken, refressToken, profile, done) => {
      const user = await User.findOne({ googleID: profile.id });
      if (!user) {
        const newUser = new User({
          googleID: profile.id,
        }).save();
        done(null, newUser);
      } else {
        done(null, user);
      }
    },
  ),
);
