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
  
}, {timestamps: true});

const User = mongoose.models.User || mongoose.model("User", shcema);

module.exports = User;
