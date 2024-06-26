const AuthUser = require('../models/Users');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) =>{
    try {
        const { email, username, password } = req.body;

        const hash = await bcrypt.hash(password, 8);

        const newUser = new AuthUser({ email, username, password: hash, contactIds: [], tags: []});

        const user = await newUser.save();

        res.status(201).json(user);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) =>{
    try {
        const { email, username, password } = req.body;

        if ([email, username, password].includes(undefined))
            return res.status(400).send(`No email or password provided`);

        const user = await AuthUser.findOne({ email:email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ user, token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser };