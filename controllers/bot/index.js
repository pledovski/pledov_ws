const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const TelegramBot = require("node-telegram-bot-api");
dotenv.config({ path: "./config/config.env" });

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
bot.on("polling_error", err => console.log(err));

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "index.json"
);

const changeContent = text => {
  fs.readFile(p, (err, content) => {
    const contentJson = JSON.parse(content);
    contentJson.text = text;
    fs.writeFile(p, JSON.stringify(contentJson), err => {
      console.log(err);
    });
  });
};

const pledBot = () => {
  bot.on("message", msg => {
    const chatId = msg.chat.id;
    const text = msg.text;
    changeContent(text);
    // bot.sendMessage(chatId, "Content changed");
  });
};

module.exports = pledBot;
