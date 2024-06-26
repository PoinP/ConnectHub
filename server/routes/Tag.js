const express = require('express');

const controller = require("../controllers/TagController");

const router = express.Router();

router.route("/tag")
//.get(controller.getTag)
.post(controller.createTag)
.delete(controller.deleteTag);

router.get("/tags", controller.getTags);

module.exports = router;