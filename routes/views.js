const express = require("express");
const router = express.Router();
const Content = require("../models/content");

router.route("/").get(async (req, res, next) => {
  const content = await Content.findOne({});
  res.render("index", content);
});

router.route("/camshow/frame").get(async (req, res, next) => {
  res.render("./camshow/frame");
});

module.exports = router;
