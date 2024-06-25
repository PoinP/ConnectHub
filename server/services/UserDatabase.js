const User = require('../model/product.model');


const searchUsers = async (searchCriteria) => {
    try {
        const users = await User.find(searchCriteria);
        return users;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getUsers = async() => {
    try {
        const users = await User.find({});
        return users;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getUser = async (id) => {
    try {
        const user = await User.findById(id);
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

const updateUser = async(id, userData) => {
    try {
        const user = await User.findByIdAndUpdate(id, userData, { new: true });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteUser = async (searchCriteria) => {
    try {
        const user = await User.findByIdAndDelete(searchCriteria);
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
    getUser,
    createUser,
    updateUser,
    deleteUser,
    searchUsers
};