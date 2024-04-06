require("dotenv").config();
const SHA256 = require("crypto-js/sha256"); // algo de hashage. Ne renvoie pas une string, pour ça on a besoin de encbase64
const encBase64 = require("crypto-js/enc-base64"); // transforme l'encryptage en string
const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Import model

router.post("/login", async (req, res) => {
  try {
    const retrieveUser = await User.findOne({
      email: req.body.email,
    });
    if (retrieveUser) {
      const newHash = SHA256(req.body.password + retrieveUser.salt).toString(
        encBase64
      );
      if (newHash === retrieveUser.hash) {
        return res.status(200).json({ token: retrieveUser.token });
      } else {
        return res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
