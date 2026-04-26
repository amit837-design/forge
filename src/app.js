const express = require("express");
const imageRoutes = require("./routes/imageRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();

app.use("/api/media", imageRoutes);
app.use(express.json());
app.use("/api/auth", authRoutes);

module.exports = app;
