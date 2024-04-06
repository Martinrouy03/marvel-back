const mg = require("mongoose");

const User = mg.model("User", {
  email: String,
  username: String,
  salt: String,
  hash: String,
  token: String,
});

module.exports = User;
