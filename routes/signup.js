require("dotenv").config();
const uid2 = require("uid2"); // sert à créer des variables aléatoires
const SHA256 = require("crypto-js/sha256"); // algo de hashage. Ne renvoie pas une string, pour ça on a besoin de encbase64
const encBase64 = require("crypto-js/enc-base64"); // transforme l'encryptage en string
const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Import model

router.use(express.json());
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email: email });
    if (checkUser) {
      res
        .status(409)
        .json({ message: "This email already exists in the data-base." });
      return;
    } else if (!Object.keys(req.body).includes("username") || !username) {
      res.status(400).json({ message: "Username missing." });
      return;
    }
    const userSalt = uid2(16);
    const userToken = uid2(64);
    const newUser = new User({
      email: email,
      username: username,
      salt: userSalt,
      hash: SHA256(password + userSalt).toString(encBase64),
      token: userToken,
    });
    const resp = {
      _id: newUser._id.valueOf(),
      token: newUser.token,
      account: newUser.account,
    };
    await newUser.save();
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
