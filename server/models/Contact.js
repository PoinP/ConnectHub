const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    _id: String,

    avatar: {
      type: String,
      required: false,
    },

    isFavorite: {
      type: Boolean,
      default: false,
    },

    name: {
      first: {
        type: String,
        required: true
      },
      last: {
        type: String,
      },
    },
    
    details: {
      phone: [
        {
          type: {
            type: String,
          },
          detail: {
            type: String,
          },
          content: {
            type: String,
          },
        },
      ],
      mail: [
        {
          type: {
            type: String,
          },
          detail: {
            type: String,
          },
          content: {
            type: String,
          },
        },
      ],
    },

    info: {
      date: [{
        type: {
          type: String,
        },
        detail: {
          type: String,
        },
        content: {
          type: String,
        },
      }],

      relationship: [{
        type: {
          type: String,
        },
        detail: {
          type: String,
        },
        content: {
          type: String,
        },
      }],

      nickname: [{
        type: {
          type: String,
        },
        detail: {
          type: String,
        },
        content: {
          type: String,
        },
      }],
    },

    tags: [
      {
        type: String
      }
    ]
  },
  {
    //timestamps: true,
    collection: "contacts",
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
