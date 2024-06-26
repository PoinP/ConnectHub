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
    token: {
      type: String,
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

userSchema.virtual('id').get(function(){
  return this._id;
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
  virtuals: true
});

const AuthUser = mongoose.model("AuthUser", userSchema);

module.exports = AuthUser;
