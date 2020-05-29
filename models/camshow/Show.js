const mongoose = require("mongoose");

const ShowSchema = new mongoose.Schema(
  {
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Cascade delete records when Show is deleted
ShowSchema.pre("remove", async function (next) {
  await this.model("Record").deleteMany({ show_id: this._id });
  next();
});

// Reverse populate with virtuals
ShowSchema.virtual("records", {
  ref: "Record",
  localField: "_id",
  foreignField: "show_id",
  justOne: false,
});

module.exports = mongoose.model("Show", ShowSchema);
