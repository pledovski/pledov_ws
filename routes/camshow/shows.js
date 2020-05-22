const express = require("express");
const router = express.Router();

const {
  create_show,
  delete_show,
  get_show,
  get_all_shows,
} = require("../../controllers/camshow/shows");

const { get_records_by_show } = require("../../controllers/camshow/records");

router.use("/:show_id/records", get_records_by_show);

router.route("/").get(get_all_shows).post(create_show);

router.route("/:show_id").get(get_show).delete(delete_show);

module.exports = router;
