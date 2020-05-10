const CHAR_RETURN = 13;

const socket = new WebSocket("ws://127.0.0.1:5000/camshow/frame");
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
