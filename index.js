const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const passport = require('passport');
const cookieSession = require('cookie-session');
//intialize mongoose model
require('./models/User');

//intialize passport
require('./services/passport');

const authRoutes = require('./routes/authRoutes');
mongoose.connect(keys.mongoURI);

const app = express();
app.use(
  cookieSession({ maxAge: 30 * 24 * 60 * 60 * 1000, keys: [keys.secret] }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth/google', authRoutes);

app.get("/api/currentUser", (req, res) => {
    res.send(req.user);
})
const PORT = process.env.PORT || 5000;
app.listen(PORT);
