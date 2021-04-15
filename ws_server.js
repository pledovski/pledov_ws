const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const WebSocketServer = require("websocket").server;

dotenv.config({ path: "./config/config.env" });

const app = express();

const WS_PORT = process.env.WS_PORT || 5000;

const ws_server = http.createServer(app);

ws_server.listen(WS_PORT, "127.0.0.1", () => {
  console.log(`Websocket server is running in ${process.env.NODE_ENV} mode on port ${WS_PORT}`);
});

const ws = new WebSocketServer({
  httpServer: ws_server,
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

exports.ws_server = ws_server;
