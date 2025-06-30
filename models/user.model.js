const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
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
        select: false, // Do not return password in queries, Agar aap user ki details fetch karte ho to password return nahi hoga
    },
    socketID: {       //Socket ID for real-time communication, used for live tracking of captain's location for the admin and user
        type: String,
        default: null,
    },

});

userSchema.methods.generateAuthenticationToken = function () {
    const token = jwt.sign(
        { userId: this._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' } // Token expires in 1 hour
    );
    return token;
}

userSchema.methods.comparePassword = async function (candidatepassword) {
    try {
        const isMatch = await bcrypt.compare(candidatepassword, this.password);
        return isMatch;
    } catch (error) {
        throw new Error('Password comparison failed');
    }
}

userSchema.statics.hashPassword = async function (password) {
    try {
        const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt
        return hashedPassword;
    } catch (error) {
        throw new Error('Password hashing failed');
    }
}

const userModel = mongoose.model('user', userSchema); // Create a model from the schema

module.exports = userModel;