const AuthUser = require('../models/Users');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { Validator } = require('../services/Validator/Validator');
const { Condition } = require('../services/Validator/Condition');
const { ValidationSchema } = require('../services/Validator/ValidationSchema');

function emptyString(str) {
  return str.length !== 0;
}

function usernameLength(username) {
  return username.length >= 3;
}

function hasSpecialCharacters(username) {
  const pattern = /^[a-zA-Z0-9]*$/;
  const regEx = new RegExp(pattern);
  return regEx.test(username);
}

function isPasswordValid(password) {
  const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const regEx = new RegExp(pattern);
  return regEx.test(password);
}

function isEmailValid(email) {
  const pattern =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  const regEx = new RegExp(pattern);
  return regEx.test(email);
}

const validationSchema = new ValidationSchema({
  username: {
    status: false,
    conditions: [
      new Condition(emptyString, "Username is required!"),
      new Condition(
        usernameLength,
        "Username must have at least 3 characters!"
      ),
      new Condition(
        hasSpecialCharacters,
        "Username should only contain letters and numbers!"
      ),
    ],
  },
  email: {
    status: false,
    conditions: [
      new Condition(emptyString, "Email is required!"),
      new Condition(isEmailValid, "Please enter a valid email address!"),
    ],
  },
  password: {
    status: false,
    conditions: [
      new Condition(emptyString, "Password is required!"),
      new Condition(
        isPasswordValid,
        "Password must have at least eight characters, at least one letter and one number!"
      ),
    ],
  },
});

const validator = new Validator(validationSchema);

async function getUserByToken(token)
{
  if (!token)
    return null;
  return await AuthUser.findOne({token});
}

const registerUser = async (req, res) =>{
    try {
        const { email, username, password } = req.body;

        let result = validator.validate("email", email);
        if (!result.isValid)
            return res.status(409).send(result.message);

        result = validator.validate("username", username);
        if (!result.isValid)
            return res.status(409).send(result.message);

        result = validator.validate("password", password);
        if (!result.isValid)
            return res.status(409).send(result.message);

        if (await AuthUser.findOne({ email })) 
            return res.status(409).send("This email is already in use!");

        if (await AuthUser.findOne({ username })) 
            return res.status(409).send("This username is already in use!");
        
        const hash = await bcrypt.hash(password, 8);
        const newUser = new AuthUser({ email, username, password: hash, contactIds: [], tags: []});

        const user = await newUser.save();
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).send("Something went wrong!");
        // res.status(500).send({ message: error.message }); DEBUG
    }
};

const logoutUser = async (req, res) => {
  const token = req.cookies.token;
  const user = AuthUser.findOne({token});
  if (!user)
    return res.status(400).send(`Bad cookie`);

  user.token = "";
  await user.save();
  return res.status(200);
}

const loginUser = async (req, res) =>{
    try {
        const { username, password } = req.body;

        if ([username, password].includes(undefined))
            return res.status(400).send("Username and password are required");

        const user = await AuthUser.findOne({ username:username });
        if (!user) return res.status(401).send("Invalid username/password");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).send("Invalid username/password");

        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
        user.token = token;
        await user.save();
        delete user.password;
        res.status(200).json({token});

    } catch (error) {
        res.status(500).send(`${error}`);
    }
};

const isLoggedIn = async (req, res) => {
    try {
        const user = await getUserByToken(req.cookies.token);
        if (!user)
            return res.status(401).send();

        return res.status(200).send();
    } catch (error) {
        res.status(500).send(`${error}`);
    }
}

module.exports = { registerUser, loginUser, logoutUser, isLoggedIn };