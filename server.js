const express = require("express");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const InitiateMongoServer = require('./config/db');

InitiateMongoServer();

const userRoutes = require('./app/routes/userRoute');
const authRoutes = require('./app/routes/authRoute');

app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
    console.log(`Server is listing on port ${PORT}`)
})