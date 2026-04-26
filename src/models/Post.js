const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  imageFieldId: { type: String }, // ImageKit fileId
  aiStatus: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", PostSchema);
