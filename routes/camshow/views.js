const axios = require("axios");
const express = require("express");
const router = express.Router();

let EventSource = require("eventsource");

const { get_admin_view, get_show_view } = require("../../models/camshow/View");

router.route("/frame").get(async (req, res, next) => {
  res.render("./camshow/frame");
});

router.route("/admin").get(get_admin_view);

router.route("/admin/shows/:show_id").get(get_show_view);

module.exports = router;
