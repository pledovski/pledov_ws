const express = require("express");
const router = express.Router();

const {
  get_release,
  getSeller,
  getMostWanted,
  getWantlist,
} = require("../../utils/camshow/discogs");

router.route("/get-release/:release_id").get(get_release);

router.route("/get-seller").post(getSeller);

router.route("/get-most-wanted").post(getMostWanted);

router.route("/get-wantlist").post(getWantlist);

module.exports = router;
