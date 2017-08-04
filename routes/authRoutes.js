const passport = require('passport');
const authRoutes = require('express').Router();

authRoutes.get(
    '/',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    }),
);

authRoutes.get('/callback', passport.authenticate('google'));

module.exports = authRoutes;
