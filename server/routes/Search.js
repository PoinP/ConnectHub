const express = require('express');

const controller = require("../controllers/SearchControllerDB");

const router = express.Router();

router.get("/search", controller.search);

module.exports = router;