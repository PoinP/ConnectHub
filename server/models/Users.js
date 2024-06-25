const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

},
{
    timestamps: true
});

const AuthUser = mongoose.model('AuthUser', contactSchema);

module.exports = AuthUser;