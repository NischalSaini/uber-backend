const dotenv = require('dotenv');
dotenv.config();   // Load environment variables from .env file
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors()); // Enable CORS for all routes

app.get('/', (req, res) => {
    res.send('Hello, Nikku!');
});

module.exports = app;