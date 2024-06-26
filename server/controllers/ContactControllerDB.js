//let tags = require("../data/tags.json");
let Contact = require("../models/Contact.js")
let Users = require("../models/Users.js")

const { sortContacts } = require("../utils/utilities");

const { updateSearch } = require("./SearchControllerDB");

async function getUserByToken(token)
{
  if (!token)
    return null;
  return await Users.findOne({token});
}

async function getUserAndContactsByToken(token) {
  let user = await getUserByToken(token);
  if (!user)
    return null;

  return {
    user: user,
    contacts: await Contact.find({_id: {$in: user.contactIds}})
  };
}


async function validateTags(user, contact) {
  let tagsSet = new Set(user.tags);
  contact.tags.forEach(tag => tagsSet.add(tag));

  user.tags = Array.from(tagsSet);
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

  const user = await getUserByToken(req.cookies.token)
  if (!user)
    return res.status(400).send("invalid cookie");

  const avatar = req.file;
  const avatarPath = avatar
    ? `http://localhost:8080/${req.file.filename}`
    : null;

  const newContact = { ...contact, _id: req.contactId ,avatar: avatarPath };

  // TEMP
  updateSearch(newContact);
  // TEMP
  validateTags(user, newContact);

  const dbContact = new Contact(newContact);
  await dbContact.save();

  user.contactIds.push(dbContact._id);
  
  await user.save();

  res.status(200).json(dbContact);
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
    const toEditContact = await Contact.findByIdAndUpdate(_id, contact);

    if (!toEditContact)
      res.status(404).send(`A user with an id of ${_id} can not be found!`);

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

  const user = getUserByToken(req.cookies.token)
  if (!user)
    return res.status(400).send(`Bad cookie`);

  const toDelete = await Contact.findByIdAndDelete(_id);
  if (!toDelete)
    return res.status(404).send(`Contact with id ${_id} was not found`);
  
  user.contactIds = user.contactIds.filter((id) => id._id !== _id);
  await user.save();

  return res.status(200).send(`Contact with id ${_id} was deleted successfully`);
}

async function deleteAllContacts(req, res) {
  await Contact.deleteMany({});
  res.status(200).send(`All contacts have been deleted successfully`);
};

async function getAllContacts(req, res) {
  let fullUser = await getUserAndContactsByToken(req.cookies.token);
  if (!fullUser)
    return res.status(400).send(`Bad cookie`);
  res.status(200).json(fullUser.contacts);
}

async function getFavoriteContacts(req, res) {
  try {
    const fullUser = await getUserAndContactsByToken(req.cookies.token);

    const favoriteContacts = fullcontacts.filter(contact => contact.isfavorite == true );
    console.log(fullUser.contacts);
      if (favoriteContacts.length == 0)
        return res.status(404).send(`No favorite contacts...`);  
    return res.status(200).json(favoriteContacts);
    
  } catch (error) {
    console.log("Error fetching favorite contacts: ", error);
    res.status(500).send(`${error}`);
  }
}

async function getTagContacts(req, res) {
    const { label } = req.query;

    const fullUser = await getUserAndContactsByToken(req.cookies.token)
    
    if (!fullUser)
      res.status(400).send(`Bad cookie`);
    
    const tag = fullUser.user.tags.find(tag => tag === label);

    if (!tag) {
        res.status(404).send(`The tag ${label} could not be found!`);
        return;
    }

    const contacts = fullUser.contacts.filter(contact => contact.tags.includes(tag));
    
    res
      .status(200)
      .json(contacts);
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