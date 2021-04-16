let currently_playing = "";

let price = q("#price-value");
let track_info = q("#track-info");
let release_cover = q("#cover");

async function update_frame() {
  let response = await easyHTTP.get(`/camshow/records/current`);
  if (response.data.id != currently_playing) {
    price.innerText = response.data.price;
    track_info.innerText = response.data.artist + " - " + response.data.title;
    release_cover.src = response.data.image;
    currently_playing = response.data._id;
  }
}
setInterval(update_frame, 1000);

let frame = q(".frame");

let frame_is_active = false;
const check_frame = async () => {
  console.log(frame_is_active);
  let response = await easyHTTP.get(`/camshow/shows/5ec679289562947e240e8a06`);
  if (response.data.is_active != frame_is_active) {
    frame_is_active = !frame_is_active;
  }
  frame.style.visibility = "hidden";
  frame_is_active ? (frame.style.visibility = "visible") : (frame.style.visibility = "hidden");
};

setInterval(check_frame, 1000);

// Marquee
let title = ["Я "];

let index = 0;
function change_title() {
  q(".main>p").innerText = title[index];
  index++;
  if (index >= title.length) {
    index = 0;
  }
}

function change_left() {
  q(".main").classList.remove("slide-right");
  q(".main").classList.add("slide-left");
}

function change_right() {
  q(".main").classList.remove("slide-left");
  q(".main").classList.add("slide-right");
  change_title();
}

function to_left() {
  setInterval(change_left, 10000);
}

function to_right() {
  setInterval(change_right, 20000);
}

to_left();
to_right();

// ========================================================== Facebook / comments
// var source = new EventSource(
//   "https://streaming-graph.facebook.com/{live-video-id}/live_comments?access_token={EAAp80KgZBZBQYBAJSX0CfXVYRfnT19eL79WVaERRyVlxsuCi1LFjglpYcx1qeHQhIvxBUfI48AQZCrSNO83tRiOOybXksEXmv3BoaugZANtmMYTFvIrNLkXWCU4GRe1mqm8AtFnQMRkdwQk4gCQyG09a2mT1ggyCl9Ms4YOGg9yq1ZCd0NeLsvuGgZBI4xyB7UZCynzi7CZBOjikpWWDpjku}&comment_rate=one_per_two_seconds&fields=from{name,id},message"
// );
// source.onmessage = function (event) {
//   console.log(event);
//   // Do something with event.message for example
// };
