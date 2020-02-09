const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");

// Load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

// Routes
const indexView = require("./routes/index");

// Init middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Static files
app.use(express.static(path.join(__dirname, "public")));

//Mount view routes
app.use("/", indexView);

const PORT = process.env.PORT || 5000;

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
