const express = require("express");
const router = express.Router();

const {
  add_record,
  delete_record,
  get_all_records,
  update_record,
} = require("../../controllers/camshow/records");

router
  .route("/")
  .get(get_all_records)
  .post(add_record)
  .delete(delete_record)
  .put(update_record);

module.exports = router;
