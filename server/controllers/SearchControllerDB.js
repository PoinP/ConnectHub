const ContactSearch = require("../services/PredictiveSearch/ContactSearch.js");
const User = require("../models/Contact.js");

const cs = new ContactSearch();

async function initializeSearch() {
    const contacts = await User.find();
    for (const contact of contacts) {
        cs.addContact(contact);
    }
}

initializeSearch();

async function getUser(id) {
    const foundUser = await User.findById(id);
    return foundUser || null;
}

async function updateSearch(contact) {
    await cs.updateContact(contact);
}

async function search(req, res) {
    const { query, tabFilter } = req.query;

    const queryResults = cs.search(query);
    let contacts = await Promise.all(queryResults.map((result) => getUser(result)));

    if (tabFilter === "favorites") {
        contacts = contacts.filter((contact) => contact && contact.isFavorite);
    } else if (tabFilter) {
        contacts = contacts.filter((contact) => contact && contact.tags.includes(tabFilter));
    }

    return res.status(200).json(contacts);
}

module.exports = { search, updateSearch };
