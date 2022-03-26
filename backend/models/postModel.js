const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  caption: String,

  image: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  time: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Post", postSchema);
