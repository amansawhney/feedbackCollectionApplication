const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
//intialize passport
require('./services/passport');

const authRoutes = require('./routes/authRoutes');
mongoose.connect(keys.mongoURI);

const app = express();

app.use("/auth/google", authRoutes);





const PORT = process.env.PORT || 5000;
app.listen(PORT);
