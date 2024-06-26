const mongoose = require("mongoose");

const User = require("../models/Users");
const Contact = require("../models/Contact");
const searchObject = require("../shared/SearchObject");

const fillSearchObject = async () => {
    const allUsers = await User.find({});

    for (const user of allUsers) {
        const userId = user._id;
        for (const contactId of user.contactIds) {
            const contact = await Contact.findById({_id: contactId._id});
            if (contact) {
                searchObject.addPredictor(userId, contact);
            }
        }
    }
}

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONN_STRING);
        console.log("Connected to database");
        await fillSearchObject();
    } catch (error) {
        console.error("Connection failed", error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
