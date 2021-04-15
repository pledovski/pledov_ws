const asyncHandler = require("../../middleware/async");
const ErrorResponse = require("../../utils/errorResponse");
const Show = require("../../models/camshow/Show");

// @desc    Get a show
// @route   Get /camshow/shows/:show_id
// @access  Private
exports.get_show = asyncHandler(async (req, res, next) => {
  let show = await Show.findById(req.params.show_id);
  res.status(200).json({ success: true, data: show });
});

// @desc    Get all shows
// @route   Get /camshow/shows/
// @access  Private
exports.get_all_shows = asyncHandler(async (req, res, next) => {
  let show = await Show.find();
  res.status(200).json({ success: true, data: show });
});

// @desc    Create a show
// @route   POST /camshow/shows/
// @access  Private
exports.create_show = asyncHandler(async (req, res, next) => {
  let show = await Show.create(req.body);

  res.status(201).json({ success: true, data: show });
});

// @desc    Delete a show
// @route   DEL /camshow/shows/
// @access  Private
exports.delete_show = asyncHandler(async (req, res, next) => {
  console.log(req.params.show_id);
  let show = await Show.findById(req.params.show_id);
  if (!show) {
    return next(new ErrorResponse(`Show not found with id of ${req.params.show_id}`, 404));
  }

  show.remove();
  res.status(200).json({ success: true, data: {} });
});

// @desc    Update a show
// @route   PUT /camshow/records/
// @access  Private
exports.update_show = asyncHandler(async (req, res, next) => {
  let show = await Show.findByIdAndUpdate(req.params.show_id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!show) {
    return next(new ErrorResponse(`Show not found with id of ${req.params.show_id}`, 404));
  }
  res.status(200).json({ success: true, data: show, message: "Show updated." });
});

// @desc    Activate frame
// @route   Get /camshow/shows/:show_id/activate
// @access  Private
exports.activate_frame = asyncHandler(async (req, res, next) => {
  await Show.updateMany({}, { is_active: false });
  let show = await Show.findByIdAndUpdate(req.params.show_id, { is_active: true }, { new: true });
  res.status(200).json({ success: true, data: show, message: "Frame is active." });
});
