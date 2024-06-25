let contacts = require("../data/contacts.json");
let bcrypt = require('bcryptjs');

function sortContacts(contacts) {
  return contacts.sort((a, b) =>
    `${a.name.first} ${a.name.second}`.localeCompare(
      `${b.name.first} ${b.name.second}`
    )
  );
}

function getContact(req, res) {
  const { id } = req;
  const foundContact = contacts.find((contact) => contact.id === id);

  if (!foundContact) {
    res.status(404).send(`A user with an id of ${id} can not be found!`);
    return;
  }

  res.status(200).send(JSON.stringify(foundContact));
}

function createContact(req, res) {
  const contact = JSON.parse(req.body.contact);
  const { _, name, details, info, tags } = contact;

  if ([name, details, info, tags].includes(undefined)) {
    res
      .status(400)
      .send(`One of the following is missing "name, details, info, tags"...`);
    return;
  }

  if (details.phone === undefined || details.phone.length == 0) {
    res.status(400).send(`No phone number(s) provided"...`);
    return;
  }

  const avatar = req.file;
  const avatarPath = avatar
    ? `http://localhost:8080/${req.file.filename}`
    : null;

  const generatedId = req.contactId;
  console.log(generatedId);
  const newContact = { ...contact, id: generatedId, avatar: avatarPath };
  console.log(newContact);

  contacts.push(newContact); // TODO: DB
  contacts = sortContacts(contacts);
  res.status(200).send(JSON.stringify(newContact));
}

function updateContact(req, res) {
  const contact = JSON.parse(req.body.contact);
  const { id, avatar, name, details, info, tags } = contact;

  if ([id, avatar, name, details, info, tags].includes(undefined)) {
    res
      .status(400)
      .send(
        `One of the following is missing "id, avatar, name, details, info, tags"...`
      );
    return;
  }

  if (!details.phone || details.phone.length == 0) {
    res.status(400).send(`No phone number(s) provided"...`);
    return;
  }

  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].id === id) {
      contacts[i] = contact;
      res.status(200).send(JSON.stringify(contacts[i]));
      return;
    }
  }
  res.status(400).send(`No contact with id ${id} was found...`);
}

function deleteContact(req, res) {
  const { id } = req.body;

  if (id === undefined) {
    res.status(400).send(`id is required...`);
    return;
  }

  contacts = contacts.filter((value) => value.id != id);
  res.status(200).send(`Contact with id ${id} was deleted successfully`);
}

function getAllContacts(req, res) {
  res.status(200).json(contacts);
}

function getFavoriteContacts(req, res) {
  res.status(200).json(contacts.filter((contact) => contact.isFavorite));
}

function registerUser(req, res) {
  const {email, password, salt} = req.body;

  if ([email, password, salt].includes(undefined))
  {
    res.status(400).send(`Missing email, password or salt`);
    return;
  }

  bcrypt.hash(password, 8, function(err, hash) {
    // TODO: store hash in DB
  });

  res.status(200).send(`Registered ${email}`);
}

function loginUser(req, res) {
  const {email, password} = req.body;

  if ([email, password].includes(undefined))
  {
    res.status(400).send(`Missing email, password or salt`);
    return;
  }

  let dbPassword = "TODO"; // TODO: DB
  bcrypt.compare(dbPassword, password).then((result) => {
    // result := true | false
    // TODO
    if (result)
    {
      res.status(200).send(`Logged in ${email}`);
      return;
    }
    else
    {
      res.status(400).send(`Wrong password for ${email}`);
    }
  });
}


module.exports = {
  getContact,
  createContact,
  updateContact,
  deleteContact,
  getAllContacts,
  getFavoriteContacts,
  registerUser,
  loginUser,
};
