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
let title = ["Я"];

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

window.fbAsyncInit = function () {
  FB.init({
    appId: "173485904628296",
    autoLogAppEvents: true,
    xfbml: true,
    version: "v10.0",
  });
  FB.api(
    "/807234366665480/comments",
    {
      access_token:
        "EAACdyNW4CkgBAFs2dlkwDNMg0uAwireUC7hpaPu4lWDkAh52No6lizHrBGg2cu51QRho8dUW7lDRMNTZCpLEzLZA2GjxV63zWOqpKZAB1sBmrVtCiRI8OVI7SKV7IZCEaOlFrKsilt2ZAveIRFalfBSWwYR3Dm5Prsz4vhsSr1YwphWk0WRWB82dTZBOGKeloQMCcpEt7fNKPgkMUxt8eN28C616CqmXrcsyX8fyatiwlZCDKK6eLplVmjWZC0oGQSkZD",
    },
    function (response) {
      if (response && !response.error) {
        console.log(response);
        response.data.forEach((element) => {
          title.push(element.message);
        });
        // title.push(response.data);
        /* handle the result */
      }
    }
  );
};

var source = new EventSource(
  "https://streaming-graph.facebook.com/807234366665480/live_comments?access_token={EAACdyNW4CkgBAFs2dlkwDNMg0uAwireUC7hpaPu4lWDkAh52No6lizHrBGg2cu51QRho8dUW7lDRMNTZCpLEzLZA2GjxV63zWOqpKZAB1sBmrVtCiRI8OVI7SKV7IZCEaOlFrKsilt2ZAveIRFalfBSWwYR3Dm5Prsz4vhsSr1YwphWk0WRWB82dTZBOGKeloQMCcpEt7fNKPgkMUxt8eN28C616CqmXrcsyX8fyatiwlZCDKK6eLplVmjWZC0oGQSkZD}&comment_rate=one_per_two_seconds&fields=from{name,id},message"
);
source.onmessage = function (event) {
  console.log(event);
  // Do something with event.message for example
};
