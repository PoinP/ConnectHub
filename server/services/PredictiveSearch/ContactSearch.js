const PredictiveSearch = require("./PredictiveSearch");

class ContactSearch extends PredictiveSearch {
  addData(string, data) {
    string = string.toLowerCase();
    super.addData(string, data);
  }

  addContact(contact) {
    const contactId = contact.id;
    const { first, last } = contact.name;
    const contactName = `${first} ${last}`;

    const info = contact.info;
    const details = contact.details;
    const tags = contact.tags;

    this.addData(first, contactId);
    this.addData(last, contactId);
    this.addData(contactName, contactId);

    if (info) {
      for (const prop in info) {
        if (Array.isArray(info[prop])) {
          for (const val of info[prop]) {
            this.addData(val.content, contactId);
          }
        }
      }
    }

    if (details) {
      for (const prop in details) {
        if (Array.isArray(details[prop])) {
          for (const val of details[prop]) {
            this.addData(val.content, contactId);
          }
        }
      } 
    }

    for (const tag of tags) {
      this.addData(tag, contactId);
    }
  }

  updateContact(contact) {
    this.removeData(contact.id);
    this.addContact(contact);
  }
}

module.exports = ContactSearch;
