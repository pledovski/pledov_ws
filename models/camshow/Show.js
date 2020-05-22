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
        },
        fb_access_token: {
          type: String,
        },
      },
      yt_stream_creds: {
        yt_stream_id: {
          type: String,
        },
        yt_access_token: {
          type: String,
        },
      },
    },
  ],
  records: [
    {
      record: {
        type: mongoose.Schema.ObjectId,
        ref: "Record",
        unique: true,
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
  status: {
    type: String,
    enum: ["past", "planned", "happening"],
    default: "planned",
  },
});

module.exports = mongoose.model("Show", ShowSchema);
