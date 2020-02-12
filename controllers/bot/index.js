const dotenv = require("dotenv");
const Content = require("../../models/content");
const TelegramBot = require("node-telegram-bot-api");
dotenv.config({ path: "./config/config.env" });

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
bot.on("polling_error", err => console.log(err));

const addNewContent = async text => {
  try {
    const content = await Content.findOneAndUpdate({}, { pageText: text });
    if (!content) {
      await Content.create({
        pageTitle: "Who is Berch?",
        pageText: text
      });
    }
    bot.sendMessage(chatId, "Content changed");
  } catch (err) {
    console.error(err);
    bot.sendMessage(chatId, "Something went wrong");
  }
};

const pledBot = () => {
  bot.on("message", msg => {
    const chatId = msg.chat.id;
    const text = msg.text;
    addNewContent(text);
  });
};

module.exports = pledBot;
