const express = require('express');
//intialize passport
require('./services/passport');

const authRoutes = require('./routes/authRoutes');
const app = express();

app.use("/auth/google", authRoutes);





const PORT = process.env.PORT || 5000;
app.listen(PORT);
