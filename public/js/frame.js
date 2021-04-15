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
