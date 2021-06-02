const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const WebSocketServer = require("websocket").server;

let EventSource = require("eventsource");

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

  let source = new EventSource(
    `https://streaming-graph.facebook.com/${process.env.FB_STREAM_ID}/live_comments?access_token=${process.env.FB_ACCESS_TOKEN}&comment_rate=one_per_two_seconds&fields=from{name,id},message`
  );
  source.on("message", function (event) {
    console.log(event.data);
    clients.forEach((client) => {
      client.send(event.data);
    });
  });
  source.on("error", function (err) {
    console.log(1);
    console.log(err);
  });

  connection.on("close", (reasonCode, description) => {
    console.log("Disconnected " + connection.remoteAddress);
    console.dir({ reasonCode, description });
  });
});

exports.ws_server = ws_server;
