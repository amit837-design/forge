const express = require("express");
const cors = require("cors");
const imageRoutes = require("./routes/imageRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();

app.use(cors());
app.use(express.json()); // MUST be before routes

app.get("/", (req, res) => {
  res.send("App is running");
});

app.use("/api/media", imageRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
