const PredictiveSearch = require("./PredictiveSearch");

class ContactSearch extends PredictiveSearch {
  addData(string, data) {
    if (typeof string !== "string") {
      console.error(`Expected string, got ${typeof string}:`, string);
      return;
    }
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

    if (Array.isArray(info.date)) {
      for (const dateObj of info.date) {
        if (dateObj.content) {
          this.addData(dateObj.content, contactId);
        }
      }
    }
    // Handle info.relationship
    if (info.relationship && info.relationship.content) {
      this.addData(info.relationship.content, contactId);
    }

    // Handle info.nickname
    if (info.nickname && info.nickname.content) {
      this.addData(info.nickname.content, contactId);
    }

    if (details.phone && Array.isArray(details.phone)) {
      for (const phoneObj of details.phone) {
        if (phoneObj.content) {
          this.addData(phoneObj.content, contactId);
        }
      }
    }

    // Handle details.mail
    if (details.mail && Array.isArray(details.mail)) {
      for (const mailObj of details.mail) {
        if (mailObj.content) {
          this.addData(mailObj.content, contactId);
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
