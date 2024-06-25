const AuthUser = require('../models/Users');

const registerUser = async (userData) => {
    try {
        const { email, password } = userData;

        const existingUser = await AuthUser.findOne({ email });

        if (existingUser) {
            throw new Error('User already exists');
        }

        const user = new AuthUser(
            { email, 
                password 
            });

        await user.save();

        return ({message: 'User registered successfully'});

    } catch (error) {
        throw new Error(error.message);
    }
}

const loginUser = async (userData) => {
    try {
        const { email, password } = userData;

        const user = await AuthUser.findOne({email,password});

        if (!user) {
            throw new Error('Invalid email or password');
        }
        if (user.password !== password) {
            throw new Error('Invalid  password');
        }
        if (user.email !== email) {
            throw new Error('Invalid email');
        }

        return ({message: 'User logged in successfully'});
    } catch (error) {
        throw new Error(error.message);
    }
};

model.exports = { registerUser, loginUser };