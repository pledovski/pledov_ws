const mongoose = require("mongoose");

const FrameContentSchema = new mongoose.Schema({
  left: {
    type: String,
  },
  right: {
    type: String,
  },
  top: {
    type: String,
  },
  bottom: {
    type: String,
  },
});

module.exports = mongoose.model("FrameContent", FrameContentSchema);
