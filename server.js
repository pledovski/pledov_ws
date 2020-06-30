const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

// const pledBot = require("./controllers/bot/index");
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Static files
app.use(express.static(path.join(__dirname, "public")));

// Bot
// pledBot();

//Mount view routes
app.use("/camshow/discogs", discogs);
app.use("/camshow/records", records);
app.use("/camshow/shows", shows);
app.use("/camshow", camshow_views);
app.use("/", index_view);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, "127.0.0.1", () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});

const ws_server = require("./ws_server").ws_server;
