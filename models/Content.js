const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema({
  pageTitle: {
    type: String,
  },
  pageText: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Content", ContentSchema);
