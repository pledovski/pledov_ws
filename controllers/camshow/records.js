const asyncHandler = require("../../middleware/async");
const ErrorResponse = require("../../utils/errorResponse");
const Record = require("../../models/camshow/Record");
const Show = require("../../models/camshow/Show");
const { create_record } = require("../../utils/camshow/discogs");

// @desc    Get records
// @route   GET /camshow/shows/:show_id/records
// @access  Private
exports.get_records_by_show = asyncHandler(async (req, res, next) => {
  let records = await Record.find({ show: req.params.show_id });

  res.status(200).json({ success: true, data: records });
});

// @desc    Get all records
// @route   POST /camshow/records/
// @access  Private
exports.get_all_records = asyncHandler(async (req, res, next) => {
  let records = await Record.find();

  res.status(200).json({ success: true, data: records });
});

// @desc    Add a record
// @route   POST /camshow/records/
// @access  Private
exports.add_record = asyncHandler(async (req, res, next) => {
  let record = await create_record(req);

  record = await Record.create(record);

  let show = await Show.findById(req.body.show_id);
  show.records.push(record);
  await show.save();
  console.log(show);

  res.status(200).json({ success: true, data: record });
});

// @desc    Delete a record
// @route   PUT /camshow/records/
// @access  Private
exports.delete_record = asyncHandler(async (req, res, next) => {
  let record = await Record.findById(req.body.record_id);

  if (!record) {
    return next(
      new ErrorResponse(`No record with the id of ${req.body.record_id}`),
      404
    );
  }

  await record.remove();

  res.status(200).json({ success: true, data: {} });
});

// @desc    Update a record
// @route   PUT /camshow/records/
// @access  Private
exports.update_record = asyncHandler(async (req, res, next) => {
  record = await create_record(req);

  record = await Record.findByIdAndUpdate(req.body.record_id, record, {
    new: true,
    runValidators: true,
  });

  if (!record) {
    return next(
      new ErrorResponse(`No record with the id of ${req.body.record_id}`),
      404
    );
  }

  res.status(200).json({ success: true, data: record });
});
