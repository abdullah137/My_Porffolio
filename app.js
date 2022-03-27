const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser  = require('body-parser');
const $ = require('jquery');


// Load config variables
dotenv.config({ path: './config/config.env' });

const app = express();

// Connect to the databse
const connectDB = require('./config/db');

// setting static folder
app.use(express.static(path.join(__dirname, 'public')));

// calling the function
connectDB();

// fecth data from the request
app.use(bodyParser.urlencoded({ extended: false }));

// set the path of the query file to be used from the node_modules jquery
app.use('/jquery', express.static(path.join(__dirname+'/node_modules/jquery/dist')))

// setting routes
app.use('/', require('./routes/index'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Your server don dey run 😁 on ${PORT}`))