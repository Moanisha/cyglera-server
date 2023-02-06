const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter valid email",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(v);
      },
      message: "Please enter a strong password-eg: Password@1",
    },
  },
  userRole: {
    type: String,
    default: "CLIENT",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const UsersCollection = mongoose.model("UsersCollection", userSchema, "Users");

module.exports = UsersCollection;
