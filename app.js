const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

// Load config variables
dotenv.config({ path: './config/config.env' });

const app = express();

// Connect to the databse
const connectDB = require('./config/db');

// setting static folder
app.use(express.static(path.join(__dirname, 'public')));

// calling the function
connectDB();

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Your server don dey run 😁 on ${PORT}`))