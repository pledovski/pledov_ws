const asyncHandler = require("../../middleware/async");
const ErrorResponse = require("../../utils/errorResponse");
const Record = require("../../models/camshow/Record");
const Show = require("../../models/camshow/Show");
const { get_record } = require("../../utils/camshow/discogs");

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
  let record = await get_record(req);

  record = await Record.create(record);

  res.status(200).json({ success: true, data: record, message: "Record added successfully." });
});

// @desc    Delete a record
// @route   PUT /camshow/records/
// @access  Private
exports.delete_record = asyncHandler(async (req, res, next) => {
  let record = await Record.findById(req.params.Record);

  if (!record) {
    return next(new ErrorResponse(`No record with the id of ${req.params.Record}`), 404);
  }

  await record.remove();

  res.status(200).json({ success: true, message: "Record deleted successfully." });
});

// @desc    Update a record
// @route   PUT /camshow/records/
// @access  Private
exports.update_record = asyncHandler(async (req, res, next) => {
  record = await create_record(req);

  record = await Record.findByIdAndUpdate(req.body.Record, record, {
    new: true,
    runValidators: true,
  });

  if (!record) {
    return next(new ErrorResponse(`No record with the id of ${req.body.Record}`), 404);
  }

  res.status(200).json({ success: true, data: record });
});

// @desc    Update a record
// @route   PUT /camshow/records/:Record/activate
// @access  Private
exports.activate_record = asyncHandler(async (req, res, next) => {
  await Record.updateMany({}, { is_active: false }, { runValidators: true, new: true });

  let record = await Record.findByIdAndUpdate(
    req.params.Record,
    { is_active: true },
    { runValidators: true, new: true }
  );

  if (!record) {
    return next(new ErrorResponse(`No record with the id of ${req.params.Record}`), 404);
  }

  res.status(200).json({ success: true, data: record, message: "Record activated." });
});

// @desc    Get current active record
// @route   GET /camshow/records/current
// @access  Private
exports.get_current_record = asyncHandler(async (req, res, next) => {
  let current = await Record.findOne({ is_active: true, show_id: "5ec679289562947e240e8a06" });
  if (!current) {
    return next(new ErrorResponse(`Unable to find currently playing record.`), 404);
  }

  res.status(200).json({ success: true, data: current });
});
