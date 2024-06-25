const express = require('express');
const authController = require('../controllers/Authentication.js'); 

const router = express.Router();

// Register route
router.post('/authenticationuser/register', async (req, res) => {
    try {
        const result = await authController.registerUser(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login route
router.post('/authenticationuser/login', async (req, res) => {
    try {
        const result = await authController.loginUser(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
