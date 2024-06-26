//let tags = require("../data/tags.json");
let Contact = require("../models/Contact.js")

const { sortContacts } = require("../utils/utilities");

const { updateSearch } = require("./SearchControllerDB");

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

async function getContact(req, res) {
  const { _id } = req.body;
  try {
      const foundContact = await Contact.findById(_id);
      if (!foundContact) {
        res.status(404).send(`A user with an id of ${_id} can not be found!`);
        return;
      }
    
      res.status(200).send(JSON.stringify(foundContact));
  }
  catch (error) {
    res.status(500).send(`${error}`)
  }

}

async function createContact(req, res) {
  const contact = req.body;
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

  const newContact = { ...contact, avatar: avatarPath };

  // TEMP
  updateSearch(newContact);
  // TEMP

  let tagsSet = new Set(...tags);

  await Contact.create(contact);
  res.status(200).json(newContact);
}

async function updateContact(req, res) {
  const contact = req.body;
  const { _id, avatar, name, details, info, tags } = contact;

  if ([_id, avatar, name, details, info, tags].includes(undefined)) {
    res
      .status(400)
      .send(
        `One of the following is missing "id, avatar, name, details, info, tags"...`
      );
    return;
  }

  if (details.phone === undefined || details.phone.length == 0) {
    res.status(400).send(`No phone number(s) provided"...`);
    return;
  }

  try
  {
    const toEditContact = await Contact.findById(_id);
    if (!toEditContact)
      res.status(404).send(`A user with an id of ${_id} can not be found!`);

    Object.assign(toEditContact, contact);

    validateTags(toEditContact);
    // TEMP
    updateSearch(contact);
    // TEMP

    await toEditContact.save();
    res.status(200).send(toEditContact);
  }
  catch(error)
  {
    res.status(500).send(`${error}`)
  }
}

async function deleteContact(req, res) {
  const { _id } = req.body;

  if (_id === undefined)
    return res.status(400).send(`id is required...`);

  const toDelete = await Contact.findByIdAndDelete(_id);
  if (!toDelete)
    return res.status(404).send(`Contact with id ${_id} was not found`);

  return res.status(200).send(`Contact with id ${_id} was deleted successfully`);
}

async function deleteAllContacts(req, res) {
  await Contact.deleteMany({});
  res.status(200).send(`All contacts have been deleted successfully`);
};

async function getAllContacts(req, res) {
  res.status(200).json(await Contact.find({}));
}

async function getFavoriteContacts(req, res) {
  try {
    const favouriteContacts = await Contact.find({ isFavourite: true });
      if (!favouriteContacts)
        return res.status(404).send(`No favourite contacts...`);
    return res.status(200).json(favouriteContacts);
  } catch (error) {
    console.log("Error fetching favourite contacts: ", error);
    res.status(500).json({ message: error.message });
  }
}

async function getTagContacts(req, res) {
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
  getTagContacts,
  deleteAllContacts
};
