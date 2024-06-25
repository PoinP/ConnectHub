const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber1: {
        type: String,
        required: true
    },
    phoneNumbers: [
        {
            type: String
        }
    ],
    phoneNumberType: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    emailType: {
        type: String
    },
    birthday: {
        type: Date,
        required: true
    },
    birthdayType: {
        type: String
    },
    relationship: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
