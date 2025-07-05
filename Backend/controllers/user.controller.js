const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blackListTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const isUserExists = await userModel.findOne({ email });
    if (isUserExists) {
        return res.status(400).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname : fullname.firstname,
        lastname : fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthenticationToken();
    res.status(201).json({
        message: 'User registered successfully',
        user: {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            socketID: user.socketID
        },
        token
    });
}

module.exports.loginUser = async (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = user.generateAuthenticationToken();

    res.cookie('token', token);

    res.status(200).json({
        message: 'Login successful',
        user: {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            socketID: user.socketID
        },
        token
    });
}   

module.exports.getUserProfile = async (req, res, next) => {
    const userId = req.user._id; // Assuming user ID is stored in req.user after authentication

    const user = await userModel.findById(userId).select('-password'); // Exclude password from the response
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
        user: {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            socketID: user.socketID
        }
    });
} 

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token'); // Clear the token cookie
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    await blackListTokenModel.create({ token });

    res.status(200).json({ message: 'Logout successful' });
}