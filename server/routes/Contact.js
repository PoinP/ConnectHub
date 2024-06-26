const express = require('express');
const multer = require('multer');
const { generateId } = require('../middlewares/Contact');

const controller = require("../controllers/ContactControllerDB");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./avatars");
  },
  filename: function (req, file, cb) {
    const contact = JSON.parse(req.body.contact);
    const id = contact.id ? contact.id : req.contactId;

    cb(null, `${id}.${file.mimetype.split("/")[1]}`);
  },
});

const upload = multer({ storage });

router.route("/contact")
.get(controller.getContact)
.post(generateId, upload.single("avatar"), controller.createContact)
.put(upload.single("avatar"), controller.updateContact)
.delete(controller.deleteContact);

router.get("/contacts", controller.getAllContacts);
router.get("/favorite-contacts", controller.getFavoriteContacts);
router.get("/contacts-tag", controller.getTagContacts)
//router.delete("/contacts", controller.deleteAllContacts);

module.exports = router;