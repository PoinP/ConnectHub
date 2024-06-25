const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    avatar: {
        type: String
    },

    isFavourite: {
        type: Boolean,
        default: false
    },

    name: {
        firtsName: {
            type: String
        },
        lastName: {
            type: String
        }
    },
    details: {
        phoneNumbers: [
            {
                type: String,
                phoneNumberType: {
                    type: String
                },
                required: true
            }
        ],
        email: {
            type: String,
            required: true,
            emailType: {
                type: String
            },
        },
    },

    info: {
            birthday: {
        type: Date,
        required: true,
        birthdayType: {
            type: String
        },
    },

    relationship: {
        type: String,
        required: true
    },
    }

}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
