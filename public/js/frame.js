const CHAR_RETURN = 13;

const socket = new WebSocket(
  `wss://${window.location.hostname}:5000/camshow/frame`
);
console.log(window.location.hostname);
const chat = document.getElementById("chat");
const msg = document.getElementById("msg");
const stripe = document.getElementById("stripe");
msg.focus();

const writeLine = (text) => {
  const line = document.createElement("div");
  stripe.innerText = `${text}`;
  // chat.appendChild(line);
};

socket.onopen = () => {
  writeLine("connected");
};

socket.onclose = () => {
  writeLine("closed");
};

socket.onmessage = (event) => {
  writeLine(event.data);
};

msg.addEventListener("keydown", (event) => {
  if (event.keyCode === CHAR_RETURN) {
    const s = msg.value;
    msg.value = "";
    writeLine(s);
    socket.send(s);
  }
});
