const express = require("express");
const router = express.Router();
const Content = require("../models/content");

router.route("/").get(async (req, res, next) => {
  const content = await Content.findOne({}).sort({ createdAt: 1 });
  res.render("index", content);
});

router.route("*").get(async (req, res, next) => {
  res.send("<h1>PAGE NOT FOUND</h1>");
});

module.exports = router;
