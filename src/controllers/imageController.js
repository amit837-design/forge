const ImageKit = require("imagekit");
const Post = require("../models/Post");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

    // 1. Upload to ImageKit
    const uploadResponse = await imagekit.upload({
      file: req.file.buffer, // Base64 or Buffer
      fileName: `dripforge_${Date.now()}`,
    });

    // 2. Save to DB
    const newPost = new Post({
      imageUrl: uploadResponse.url,
      imageFieldId: uploadResponse.fileId,
    });
    await newPost.save();

    // 3. Call the "Internal" AI API Logic
    // In a real app, this could be an Axios call to another service
    const aiMessage = await triggerAiResponse(newPost._id);

    res.status(201).json({
      message: "Upload successful",
      data: newPost,
      ai_response: aiMessage,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mock function for the secondary API call
async function triggerAiResponse(postId) {
  // Simulate a delay or external call
  return "ai got the image";
}
