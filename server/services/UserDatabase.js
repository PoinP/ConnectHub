const User = require('../model/product.model');
const bcrypt = require('bcrypt');

// Todo:
// Remake as normal js code

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({users});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json({user});
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
};

const createUser = async (req, res) => {  
    try{
        const user = await User.create(req.body);
        res.status(200).json({user});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};


const updateUser = async (req, res) => {
    try{
        const { id } = req.params;

        const user = await User.findByIdAndUpdate(id, req.body);

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        const updateUser = await User.findById(id);
        res.status(200).json({updateUser});

    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};

const deleteUser = async (req, res) => {
    try{
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        res.status(200).json({message: "User deleted"});

    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};

const searchUsers = async (req, res) => {
    try {
        const searchCriteria = req.body; 
        const users = await User.find(searchCriteria);
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: error.message });
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