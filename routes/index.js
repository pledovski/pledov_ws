const pageContent = require("../data/index.json");
const express = require("express");
const router = express.Router();

router.route("/").get((req, res, next) => {
  res.render("index", {
    pageTitle: pageContent.title,
    pageText: pageContent.text
  });
});

module.exports = router;
