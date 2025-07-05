const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const blackListTokenModel = require('../models/blacklistToken.model');


module.exports.registerCaptain = async (req, res, next) => {

    console.log('Incoming request body:', req.body);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const isCaptainExists = await captainModel.findOne({ email });

    if (isCaptainExists) {
        return res.status(400).json({ message: 'Captain with this email already exists' });
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = captain.generateAuthenticationToken();
    res.status(201).json({
        message: 'Captain registered successfully',
        captain: {
            id: captain._id,
            fullname: captain.fullname,
            email: captain.email,
            vehicle: captain.vehicle
        },
        token
    });
}

module.exports.loginCaptain = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordMatch = await captain.comparePassword(password);
    if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = captain.generateAuthenticationToken();

    res.cookie('token', token); 

    res.status(200).json({
        message: 'Captain logged in successfully',
        captain: {
            id: captain._id,
            fullname: captain.fullname,
            email: captain.email,
            vehicle: captain.vehicle
        },
        token
    });
}

module.exports.getCaptainProfile = async (req, res, next) => {
    const captain = req.captain; // The authenticated captain is attached to the request object by the auth middleware

    res.status(200).json({
        message: 'Captain profile retrieved successfully',
        captain: {
            id: captain._id,
            fullname: captain.fullname,
            email: captain.email,
            vehicle: captain.vehicle
        }
    });
} 

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // Get token from cookies or Authorization header
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    await blackListTokenModel.create({token}) // Blacklist the token

    res.clearCookie('token'); // Clear the cookie
    res.status(200).json({ message: 'Captain logged out successfully' });
}
