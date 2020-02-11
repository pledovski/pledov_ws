const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema({
  pageTitle: {
    type: String
  },
  pageText: {
    type: String
  }
});

module.exports = mongoose.model("Content", ContentSchema);
