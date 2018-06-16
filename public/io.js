socket = io();

socket.on("connect", () => {
  console.log("connected to server");

  socket.emit("createMessage", {
    from: "suneeth",
    text: "Hey, what's up",
    createdAt: new Date().getTime()
  });
});

socket.on("disconnect", () => {
  console.log("disconnected from server");
});

socket.on("newMessage", message => console.log(message));
