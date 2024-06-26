const express = require('express');
const router = express.Router();
const controller = require("../controllers/Authentication.js")

router.post("/register", controller.registerUser)
router.get("/login", controller.loginUser)

module.exports = router;