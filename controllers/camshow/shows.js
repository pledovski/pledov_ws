const asyncHandler = require("../../middleware/async");
const errorResponse = require("../../utils/errorResponse");

// @desc    Get a show
// @route   Get /camshow/shows/:show_id
// @access  Private
exports.get_show = asyncHandler(async (req, res, next) => {
  let show = Show.findById(req.params.show_id);
  res.status(200).json({ success: true, data: show });
});

// @desc    Get all shows
// @route   Get /camshow/shows/
// @access  Private
exports.get_all_shows = asyncHandler(async (req, res, next) => {
  let show = Show.find();
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
  let show = await Show.findById(req.params.id);

  if (!show) {
    return next(
      new ErrorResponse(`Show not found with id of ${req.params.id}`, 404)
    );
  }

  show.remove();

  res.status(200).json({ success: true, data: {} });
});

// @desc    Update a show
// @route   PUT /camshow/records/
// @access  Private
exports.update_show = asyncHandler(async (req, res, next) => {
  let show = await Show.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!show) {
    return next(
      new ErrorResponse(`Show not found with id of ${req.params.id}`, 404)
    );
  }
});
