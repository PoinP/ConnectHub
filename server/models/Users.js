const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    contactIds: [
      {
        _id: String
      }
    ],
    tags: [
      {
        type: String
      }
    ]
  },
  {
    //timestamps: true,
    collection: "authenticationuser",
  }
);

const AuthUser = mongoose.model("AuthUser", userSchema);

module.exports = AuthUser;
