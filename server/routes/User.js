const express = require('express');
const router = express.Router();
const controller = require("../controllers/Authentication.js")

router.post("/register", controller.registerUser);
router.post("/login", controller.loginUser);
router.post("/logout", controller.logoutUser);
router.get("/logged", controller.isLoggedIn);

module.exports = router;
