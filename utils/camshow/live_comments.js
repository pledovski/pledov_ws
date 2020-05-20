const EventSource = require("eventsource");
const asyncHandler = require("../../middleware/async");

exports.read_comments = asyncHandler(
  async (fb_stream_creds, yt_stream_creds) => {
    let { fb_stream_id, fb_access_token } = fb_stream_creds;
    let { yt_stream_id, yt_access_token } = yt_stream_creds;
    let fb_es = new EventSource(
      `https://streaming-graph.facebook.com/${fb_stream_id}/live_comments?access_token=${fb_access_token}&comment_rate=one_per_two_seconds&fields=from{name,id},message`
    );
    es.on("message", function (e) {
      return e.data;
    });
  }
);
