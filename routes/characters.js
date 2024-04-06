require("dotenv").config();
const axios = require("axios");
const express = require("express");
const router = express.Router();

router.get("/characters", async (req, res) => {
  const name = req.query.name;
  const skip = req.query.skip;
  const limit = req.query.limit;
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?limit=${limit}&skip=${skip}&name=${name}&apiKey=${process.env.API_KEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
