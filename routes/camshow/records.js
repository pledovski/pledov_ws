const express = require("express");
const router = express.Router();

const {
  add_record,
  delete_record,
  get_all_records,
  update_record,
  activate_record,
  get_current_record,
} = require("../../controllers/camshow/records");

router.route("/").get(get_all_records).post(add_record).put(update_record);

router.route("/:Record").delete(delete_record);
router.route("/:Record/activate").put(activate_record);
router.route("/current").get(get_current_record);

module.exports = router;
