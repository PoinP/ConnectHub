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
        res.status(500).send(`${error}`);
    }
};

const loginUser = async (req, res) =>{
    try {
        const { username, password } = req.body;

        if ([username, password].includes(undefined))
            return res.status(400).send(`No username or password provided`);

        const user = await AuthUser.findOne({ username:username });
        if (!user) return res.status(404).send("User not found");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send("Invalid credentials");

        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
        user.token = token;
        await user.save();
        delete user.password;
        res.status(200).json({token});

    } catch (error) {
        res.status(500).send(`${error}`);
    }
};

module.exports = { registerUser, loginUser };