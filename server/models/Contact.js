const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    avatar: {
      type: String,
      required: false,
    },

    isFavourite: {
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
        required: true
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
          type: Date,
        },
      }],

      relationship: {
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

      nickname: {
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
    },

    tags: [
      {
        type: String
      }
    ]
  },
  {
    timestamps: true,
    collection: "contacts",
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
