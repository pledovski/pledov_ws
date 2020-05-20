const mongoose = require("mongoose");

const ShowSchema = new mongoose.Schema({
  show_name: {
    type: String,
    required: [true, "Show name is required"],
    unique: true,
  },
  credentials: [
    {
      fb_stream_creds: {
        fb_stream_id: {
          type: String,
          required: true,
        },
        fb_access_token: {
          type: String,
          required: true,
        },
      },
      yt_stream_creds: {
        yt_stream_id: {
          type: String,
          required: true,
        },
        yt_access_token: {
          type: String,
          required: true,
        },
      },
    },
  ],
  records: [
    {
      record: {
        type: mongoose.Schema.ObjectId,
        ref: "Record",
      },
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
  scheduled_for: {
    type: Date,
  },
});

module.exports = mongoose.model("Show", ShowSchema);
