const passport = require('passport');
const authRoutes = require('express').Router();

authRoutes.get(
    '/',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    }),
);

authRoutes.get('/callback', passport.authenticate('google', {
    successRedirect: "/api/currentUser",
    failureRedirect: ''
}));

authRoutes.get('/logout', (req, res) => {
    req.logOut();
    res.send(req.user);
})



module.exports = authRoutes;
