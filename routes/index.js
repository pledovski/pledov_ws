const express = require("express");
const router = express.Router();
const Content = require("../models/content");

router.route("/").get(async (req, res, next) => {
  const content = await Content.find({}).sort({ createdAt: 1 });
  if (!content.pageTitle) {
    content.pageTitle = "BERCH XYI!";
  }
  res.render("index", content);
});

router.route("*").get(async (req, res, next) => {
  res.send("<h1>PAGE NOT FOUND</h1>");
});

module.exports = router;
