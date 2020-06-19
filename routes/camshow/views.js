const express = require("express");
const router = express.Router();
const Content = require("../../models/content");

const { get_admin_view, get_show_view } = require("../../models/camshow/View");

router.route("/").get(async (req, res, next) => {
  const content = await Content.findOne({});
  res.render("index", content);
});

router.route("/frame").get(async (req, res, next) => {
  console.log("object");
  res.render("./camshow/frame");
});

router.route("/admin").get(get_admin_view);

router.route("/admin/shows/:show_id").get(get_show_view);

router.route("*").get(async (req, res, next) => {
  res.send("<h1>PAGE NOT FOUND</h1>");
});

module.exports = router;
