const express = require('express');

const controller = require("../controllers/TagController");

const router = express.Router();

router.get("/tag", controller.getTag)
.post("/tag", controller.createTag)
.delete("/tag", controller.deleteTag);

module.exports = router;