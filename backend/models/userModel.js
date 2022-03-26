const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },

  pfp: {
    public_id: {
      type: String,
      default:
        "https://res.cloudinary.com/dnru88a90/image/upload/v1646948417/socialmedia/9b47a023caf29f113237d61170f34ad9_zztlbo.jpg",
    },
    url: {
      type: String,
      default:
        "https://res.cloudinary.com/dnru88a90/image/upload/v1646948417/socialmedia/9b47a023caf29f113237d61170f34ad9_zztlbo.jpg",
    },
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Account already exists with this email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false,
  },

  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  bio: {
    type: String,
    default: "No bio yet",
  },

  followings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//hash paassowrd
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

//get jwt
userSchema.methods.getJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_DATE,
  });
};

//compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//reset password token
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
