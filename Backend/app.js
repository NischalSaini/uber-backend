const dotenv = require('dotenv');
dotenv.config();   // Load environment variables from .env file
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db/db'); // Import the database connection function
const cookieparser = require('cookie-parser'); // Import cookie parser middleware
const userRoutes = require('./routes/user.routes'); // Import user routes
const captainRoutes = require('./routes/captain.routes'); // Import captain routes

connectDB(); // Connect to the database

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(cookieparser()); // Use cookie parser middleware to parse cookies

app.get('/', (req, res) => {
    res.send('Hello, Nikku!');
});
app.use('/users', userRoutes); // Use user routes for /user endpoint
app.use('/captains', captainRoutes); // Use captain routes for /captain endpoint

module.exports = app;