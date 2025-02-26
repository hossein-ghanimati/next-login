const { default: mongoose } = require("mongoose");

const shcema = mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    
  },
  role: {
    type: String,
    required: true,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
  tokenVersion: {
    type: Number,
    required: true,
    default: 0,
  }
  
}, {timestamps: true});

const User = mongoose.models.User || mongoose.model("User", shcema);

module.exports = User;
