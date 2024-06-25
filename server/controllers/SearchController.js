const PredictiveSearch = require("../services/PredictiveSearch");
let contacts = require("../data/contacts.json");

const ps = new PredictiveSearch();

for (contact of contacts) {
    const contactId = contact.id;
    const {first, last} = contact.name;
    const contactName = `${first} ${last}`;
    const contactPhone = contact.details.phone[0].content;

    ps.addData(contactName.toLowerCase(), contactId);
    ps.addData(contactPhone, contactId);
}

function getUser(id) {
    const foundUser = contacts.find(contact => contact.id == id);
    
    if(!foundUser)
        return null

    return foundUser;
}

function search(req, res) {
    const { query, favorites } = req.query;

    const queryResults = ps.search(query);
    let contacts = queryResults.map(result => getUser(result));

    if (favorites == "true") {
        contacts = contacts.filter((contact) => contact.isFavorite);
    }

    return res.status(200).json(contacts);
}

function searchFavorites(req, res) {
    const { query } = req.query;
    const queryResults = ps.search(query);
    const contacts = queryResults
      .map((result) => getUser(result))
      .filter((user) => user.isFavorite);

    return res.status(200).json(contacts);
}

module.exports = { search, searchFavorites }