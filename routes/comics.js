require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/comics", async (req, res) => {
  const title = req.query.title;
  try {
    response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?title=${title}&apiKey=${process.env.API_KEY}`
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.json(response.data);
});
router.get("/comics/:characterId", async (req, res) => {
  const characterId = req.params.characterId;
  try {
    response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${process.env.API_KEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
