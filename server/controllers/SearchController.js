const ContactSearch = require("../services/PredictiveSearch/ContactSearch.js");
let contacts = require("../data/contacts.json");

const cs = new ContactSearch();

for (const contact of contacts) {
    cs.addContact(contact);
}

function getUser(id) {
    const foundUser = contacts.find(contact => contact.id == id);
    
    if(!foundUser)
        return null

    return foundUser;
}

// No database :)))
function updateSearch(contact) {
    cs.updateContact(contact);
}

function search(req, res) {
  const { query, tabFilter } = req.query;

  const queryResults = cs.search(query);
  let contacts = queryResults.map((result) => getUser(result));

  if (tabFilter === "favorites") {
    contacts = contacts.filter((contact) => contact.isFavorite);
  }
  else if (tabFilter) {
    contacts = contacts.filter((contact) => contact.tags.includes(tabFilter));
  }

  return res.status(200).json(contacts);
}

function searchFavorites(req, res) {
    const { query } = req.query;
    const queryResults = cs.search(query);
    const contacts = queryResults
      .map((result) => getUser(result))
      .filter((user) => user.isFavorite);

    return res.status(200).json(contacts);
}

module.exports = { search, searchFavorites, updateSearch }