let tags = require("../data/tags.json");
let contacts = require("../data/contacts.json");

const { sortContacts } = require("../utils/utilities");

const { updateSearch } = require("./SearchController");

function getContactById(id) {
    const foundContact = contacts.find(contact => contact.id === id);
    
    if(!foundContact)
        return null

    return foundContact;
}

function validateTags(contact) {
    const contactTags = contact.tags;
    for (const {label, contacts} of tags) {
        const foundIndex = contacts.findIndex(id => id === contact.id);

        if (foundIndex != -1) {
            contacts.splice(foundIndex, 1);
        }
    }

    for (const tag of contactTags) {
        for (const {label, contacts} of tags) {
            if (tag === label) {
                contacts.push(contact.id);
                return;
            }
        }
    }
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
  const newContact = { ...contact, id: generatedId, avatar: avatarPath };

  // TEMP
  updateSearch(newContact);
  // TEMP

  contacts.push(newContact); // TODO: DB
  contacts = sortContacts(contacts);
  res.status(200).json(newContact);
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
        validateTags(contacts[i]);
        // TEMP
        updateSearch(contact);
        // TEMP
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

function getTagContacts(req, res) {
    const { label } = req.query;
    const tag = tags.find(tag => tag.label === label);

    if (!tag) {
        res.status(404).send(`The tag ${label} could not be found!`);
        return;
    }

    res
      .status(200)
      .json(tag.contacts.map((id) => getContactById(id)));
}

module.exports = {
  getContact,
  createContact,
  updateContact,
  deleteContact,
  getAllContacts,
  getFavoriteContacts,
  getTagContacts
};
