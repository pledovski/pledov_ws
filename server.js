const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");
const connectDB = require("./config/db");

const http = require("http");
const WebSocketServer = require("websocket").server;

// const pledBot = require("./controllers/bot/index");
// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect DB
connectDB();

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

// Routes
const viewRoutes = require("./routes/views");

// Init middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Static files
app.use(express.static(path.join(__dirname, "public")));

// Bot
// pledBot();

//Mount view routes
app.use("/", viewRoutes);

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

const ws = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false,
});

const clients = [];

ws.on("request", (req) => {
  const connection = req.accept("", req.origin);
  clients.push(connection);
  console.log("Connected " + connection.remoteAddress);
  connection.on("message", (message) => {
    const dataName = message.type + "Data";
    const data = message[dataName];
    console.dir(message);
    console.log("Received: " + data);
    clients.forEach((client) => {
      if (connection !== client) {
        client.send(data);
      }
    });
  });
  connection.on("close", (reasonCode, description) => {
    console.log("Disconnected " + connection.remoteAddress);
    console.dir({ reasonCode, description });
  });
});
