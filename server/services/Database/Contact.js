const User = require('../../models/Contact.js');

const searchUsers = async (searchCriteria) => {
    try {
        const users = await User.find(searchCriteria);
        return users;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getUsers = async () => {
    try {
        const users = await User.find({});
        return users;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ 'details.email.address': email });
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

const createUser = async (userData) => {
    try {
        const user = await User.create(userData);
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

const updateUserByEmail = async (email, userData) => {
    try {
        const user = await User.findOneAndUpdate({ 'details.email.address': email }, userData, { new: true });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteUserByEmail = async (email) => {
    try {
        const user = await User.findOneAndDelete({ 'details.email.address': email });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getUsers,
    getUserByEmail,
    createUser,
    updateUserByEmail,
    deleteUserByEmail,
    searchUsers
};
