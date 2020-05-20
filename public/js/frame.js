// const CHAR_RETURN = 13;

// const socket = new WebSocket(`wss://${window.location.hostname}/camshow/frame`);
// console.log(window.location.hostname);
// const chat = document.getElementById("chat");
// const msg = document.getElementById("msg");
// const stripe = document.getElementById("stripe");
// msg.focus();

// const writeLine = (text) => {
//   const line = document.createElement("div");
//   stripe.innerText = `${text}`;
//   // chat.appendChild(line);
// };

// socket.onopen = () => {
//   writeLine("connected");
// };

// socket.onclose = () => {
//   writeLine("closed");
// };

// socket.onmessage = (event) => {
//   writeLine(event.data);
// };

// msg.addEventListener("keydown", (event) => {
//   if (event.keyCode === CHAR_RETURN) {
//     const s = msg.value;
//     msg.value = "";
//     writeLine(s);
//     socket.send(s);
//   }
// });

const source = new EventSource(
  "https://streaming-graph.facebook.com/655518188330177/live_comments?access_token=EAAp80KgZBZBQYBAEJ5JDdMMiZBqrH4lRJkmuRZBDAf4t9R3ZAQ9NjZAuXMdXRgcfQh43GTBYl8tPkLMIf10IXb9PHuKW2htGcdyH750uTjLRzjLWhr5yExXKcFfdtJ9MEgZCACeZChDAJgqfTuGcV6oGyu4cTqTqoMn4aGy7AOyD1rFGvqWNRtJNwUpZBqzr7Cxhcy9lcwunRi0ON8xnIOs63xsdLv4CEsyw1AlsPPO7m6AZDZD&comment_rate=one_per_two_seconds&fields=from{name,id},message"
);
source.onmessage = function (event) {
  console.log(event.message);
};
