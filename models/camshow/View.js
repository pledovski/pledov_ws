const asyncHandler = require("../../middleware/async");
const Show = require("../../models/camshow/Show");
const Record = require("../../models/camshow/Record");

exports.get_admin_view = asyncHandler(async (req, res, next) => {
  let page_content = {};
  page_content.page_title = "Our shows";
  page_content.shows_list = await Show.find().populate("records");
  console.log(page_content.shows_list);
  res.render("./camshow/admin", { page_content });
});

exports.get_show_view = asyncHandler(async (req, res, next) => {
  let page_content = {};
  page_content.show = await Show.findById(req.params.show_id).populate(
    "records"
  );
  console.log(page_content);
  res.render("./camshow/show", { page_content });
});
