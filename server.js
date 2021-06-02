const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

const pledBot = require("./controllers/bot/index");
// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect DB
connectDB();

const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.set("view engine", "ejs");
app.set("views", "./views");

// Routes
const camshow_views = require("./routes/camshow/views");
const index_view = require("./routes/index");

const discogs = require("./routes/camshow/discogs");
const records = require("./routes/camshow/records");
const shows = require("./routes/camshow/shows");

// Init middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Static files
app.use(express.static(path.join(__dirname, "public")));

// Bot
pledBot();

//Mount view routes
app.use("/camshow/discogs", discogs);
app.use("/camshow/records", records);
app.use("/camshow/shows", shows);
app.use("/camshow", camshow_views);
app.use("/", index_view);

app.use(errorHandler);

let PORT;
let IP;
if (process.env.NODE_ENV === "development") {
  PORT = 5000;
  // IP = "192.168.1.93";
  IP = "127.0.0.1";
} else {
  PORT = process.env.PORT || 6000;
  IP = "127.0.0.1";
}

app.listen(PORT, IP, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on ${IP}:${PORT}`);
});

const ws_server = require("./ws_server").ws_server;
