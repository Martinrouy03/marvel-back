require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
mongoose.connect(process.env.MONGODB_URI);

// import routes:
const comicsRoutes = require("./routes/comics");
app.use(comicsRoutes);
const charactersRoutes = require("./routes/characters");
app.use(charactersRoutes);
const signupRoutes = require("./routes/signup");
app.use(signupRoutes);
const loginRoutes = require("./routes/login");
app.use(loginRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist!" });
});

app.listen(process.env.PORT, () => {
  console.log("Server has started!");
});
