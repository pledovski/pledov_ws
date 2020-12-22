const dotenv = require("dotenv");
const Content = require("../../models/content");
const TelegramBot = require("node-telegram-bot-api");
dotenv.config({ path: "./config/config.env" });

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
bot.on("polling_error", (err) => console.log(err));

const addNewContent = async (msg) => {
  try {
    const text = msg.text;
    const chatId = msg.chat.id;
    const content = await Content.create({ pageTitle: "BERCH XYI!", pageText: text });
    bot.sendMessage(chatId, "Content changed");
  } catch (err) {
    console.error(err);
    bot.sendMessage(chatId, "Something went wrong");
  }
};

const pledBot = () => {
  bot.on("message", (msg) => {
    addNewContent(msg);
  });
};

module.exports = pledBot;
