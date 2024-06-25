const User = require("../models/Contacts.js");

// READ

const getContacts = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getContactByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getContactFriends = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    const friends = await Promise.all(
      user.friends.map((email) => User.findOne({ email }))
    );

    const formattedFriends = friends.map(
      ({ email, isFavourite, firstName, lastName }) => {
        return { email, isFavourite, firstName, lastName };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// UPDATE
const addRemoveContact = async (req, res) => {
  try {
    const { email, friendEmail } = req.params;

    const user = await User.findOne({ email });
    const friend = await User.findOne({ email: friendEmail });

    if (user.friends.includes(friend.email)) {
      user.friends = user.friends.filter((email) => email !== friendEmail);
      friend.friends = friend.friends.filter((email) => email !== email);
    } else {
      user.friends.push(friendEmail);
      friend.friends.push(email);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((email) => User.findOne({ email }))
    );

    const formattedFriends = friends.map(
      ({ email, isFavourite, firstName, lastName }) => {
        return { email, isFavourite, firstName, lastName };
      }
    );

    res.status(200).json(formattedFriends);

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// DELETE
const deleteContact = async (req, res) => {
  try {
    const { email } = req.params;
    await User.findOneAndDelete({ email });
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// SEARCH BY CRITERIA
const searchContacts = async (req, res) => {
  try {
    const criteria = req.query;
    const users = await User.find(criteria);
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// UPDATE BY CRITERIA
const updateContact = async (req, res) => {
  try {
    const { email } = req.params;
    const updateData = req.body;
    const user = await User.findOneAndUpdate({ email }, updateData, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// MARK AS FAVOURITE
const markAsFavourite = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    user.isFavourite = !user.isFavourite;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
    getContacts,
    getContactByEmail,
    getContactFriends,
    addRemoveContact,
    deleteContact,
    searchContacts,
    updateContact,
    markAsFavourite,
    };