const socket = io(https://messaging-app-tewf.onrender.com);
const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("send");
const chatBox = document.getElementById("chat-box");
const typingStatus = document.getElementById("typing-status");
const fileInput = document.getElementById("fileInput");

sendBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const message = messageInput.value.trim();
  if (username && message) {
    socket.emit("chat message", { username, message });
    messageInput.value = "";
  }
});

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    socket.emit("file", { username: usernameInput.value, file: e.target.result, filename: file.name });
  };
  reader.readAsDataURL(file);
});

messageInput.addEventListener("input", () => {
  socket.emit("typing", usernameInput.value);
});

socket.on("chat message", (data) => {
  const div = document.createElement("div");
  div.innerHTML = `<strong>${data.username}:</strong> ${data.message}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
});

socket.on("file", (data) => {
  const div = document.createElement("div");
  div.innerHTML = `<strong>${data.username}:</strong> <a href="${data.file}" download="${data.filename}">${data.filename}</a>`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
});

socket.on("typing", (username) => {
  typingStatus.innerText = `${username} is typing...`;
  setTimeout(() => {
    typingStatus.innerText = "";
  }, 1000);
});
