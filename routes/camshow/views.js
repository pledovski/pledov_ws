const axios = require("axios");
const express = require("express");
const router = express.Router();

const { get_admin_view, get_show_view } = require("../../models/camshow/View");

router.route("/frame").get(async (req, res, next) => {
  try {
    let response = await axios.get(
      "https://streaming-graph.facebook.com/1376927689347575/live_comments"
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }

  res.render("./camshow/frame");
});

router.route("/admin").get(get_admin_view);

router.route("/admin/shows/:show_id").get(get_show_view);

module.exports = router;
