const mongoose = require("mongoose");

const RecordSchema = new mongoose.Schema({
  show_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Show",
  },
  release_id: {
    type: String,
  },
  discogs_url: {
    type: String,
    required: [true, "Please enter a discogs URL"],
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      "Please use a valid URL with HTTP or HTTPS",
    ],
  },
  artist: {
    type: String,
  },
  title: {
    type: String,
  },
  style: {
    type: String,
  },
  year: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, " Please fill in the price"],
  },
  discogs_price: {
    type: String,
  },
  condition: {
    type: String,
  },
  cover_art: {
    type: String,
  },
  label: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  is_active: { type: Boolean, default: false },
  image: {
    type: String,
  },
  is_active: { type: Boolean, default: false },
});

// RecordSchema.index({ show_id: 1, release_id: 1 }, { unique: true });

module.exports = mongoose.model("Record", RecordSchema);
