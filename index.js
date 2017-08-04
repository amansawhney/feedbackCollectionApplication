const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
//intialize passport
require('./services/passport');

//intialize mongoose model
require('./models/User')

const authRoutes = require('./routes/authRoutes');
mongoose.connect(keys.mongoURI);

const app = express();

app.use("/auth/google", authRoutes);





const PORT = process.env.PORT || 5000;
app.listen(PORT);
