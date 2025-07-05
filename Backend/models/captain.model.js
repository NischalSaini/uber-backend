const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minLength: [3, 'First name must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            minLength: [3, 'Last name must be at least 3 characters long'],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: [5, 'Email must be at least 5 characters long'],
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email address'],
    },
    password: {         
        type: String,
        required: true,
        select: false, // Do not return password in queries
    },
    socketId: {       //Socket ID for real-time communication, used for live tracking of captain's location for the admin and user
        type: String,
        default: null,
    },

    status: { // Status of the captain (e.g., available, busy, offline)
        type: String,
        enum: ['available', 'busy', 'offline'],
        default: 'offline',
    },

    vehicle: {
        color: {
            type: String,
            required: true,
            minLength: [3, 'Vehicle color must be at least 3 characters long'],
        },
        plate: {
            type: String,
            required: true,
            unique: true,
            minLength: [3, 'Vehicle plate must be at least 3 characters long'],
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Vehicle capacity must be at least 1'],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'bike', 'truck'], // Example vehicle types
        }
    },

    location: {
        lat: {
           type: Number,
        },
        lng: {
           type: Number,
        }
    }
})

captainSchema.methods.generateAuthenticationToken = function () {
    const token = jwt.sign(
        { captainId: this._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' } // Token expires in 1 hour
    );
    return token;
}

captainSchema.methods.comparePassword = async function (candidatepassword) {
    try {
        const isMatch = await bcrypt.compare(candidatepassword, this.password);
        return isMatch;
    } catch (error) {
        throw new Error('Password comparison failed');
    }
}

captainSchema.statics.hashPassword = async function (password) {
    try {
        const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt
        return hashedPassword;
    } catch (error) {
        throw new Error('Password hashing failed');
    }
}

const captainModel = mongoose.model('Captain', captainSchema);

module.exports = captainModel; // Export the captain model

