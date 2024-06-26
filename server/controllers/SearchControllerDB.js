const User = require("../models/Users.js");
const Contact = require("../models/Contact.js");
const searchObject = require("../shared/SearchObject.js");

async function getContact(id) {
    const foundContact = await Contact.findById(id);
    return foundContact || null;
}

async function getUserByToken(token)
{
  if (!token)
    return null;
  return await User.findOne({token});
}

async function search(req, res) {
    const { query, tabFilter } = req.query;

    const user = await getUserByToken(req.cookies.token);
    if (!user) return res.status(404, "Invalid token!");

    const queryResults = searchObject.getPredictor(user._id).search(query);
    let contacts = await Promise.all(queryResults.map((result) => getContact(result)));

    if (tabFilter === "favorites") {
        contacts = contacts.filter((contact) => contact && contact.isFavorite);
    } else if (tabFilter) {
        contacts = contacts.filter((contact) => contact && contact.tags.includes(tabFilter));
    }

    return res.status(200).json(contacts);
}

module.exports = { search };
