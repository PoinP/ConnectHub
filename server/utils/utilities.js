function sortContacts(contacts) {
  return contacts.sort((a, b) =>
    `${a.name.first} ${a.name.second}`.localeCompare(
      `${b.name.first} ${b.name.second}`
    )
  );
};

module.exports = { sortContacts };