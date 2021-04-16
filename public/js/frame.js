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
let messages = [];

let index = 0;
function change_message() {
  if (messages[index]) {
    q(".main>p").innerText = Object.values(messages[index])[0];
    console.log(messages[index]);
    q("#post-author").innerText = Object.keys(messages[index])[0];
    index++;
    if (index >= messages.length) {
      index = 0;
    }
  }
}

function change_left() {
  q(".main").classList.remove("slide-right");
  q(".main").classList.add("slide-left");
}

function change_right() {
  q(".main").classList.remove("slide-left");
  q(".main").classList.add("slide-right");
  change_message();
}

function to_left() {
  setInterval(change_left, 5000);
}

function to_right() {
  setInterval(change_right, 10000);
}

to_left();
to_right();

const socket = new WebSocket("ws://localhost:5500");
socket.addEventListener("message", function (event) {
  let data = JSON.parse(event.data);

  const regex = /#1/;
  const found = data.message.match(regex);
  if (found) {
    data.message = data.message.replace(regex, "");
    messages.push({ [data.from.name]: data.message });
  }
  setTimeout(() => {
    messages.shift();
    if (messages.length == 0)
      messages.push({
        "Вініловий №1:":
          "відправ повідомлення з хештегом #1 в коментарі та побач його в прямому ефірі!",
      });
  }, 5000);
});
