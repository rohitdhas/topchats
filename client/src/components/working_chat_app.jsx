import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import styled from "styled-components";

function Works() {
  const msg_input = useRef("");
  const room_input = useRef("");
  const [socket, setSocket] = useState();
  const [username, setUsername] = useState("");

  function sendMessage(e, socket) {
    e.preventDefault();
    const message = msg_input.current.value;
    const room = room_input.current.value;

    if (!message) return;
    else {
      displayMessage(`You - ${message}`, "mine");
      socket.emit("message", message, username, room);
      msg_input.current.value = "";
    }
  }

  useEffect(() => {
    let socketConnection = io("http://localhost:4000");

    socketConnection.on("connect", () => {
      displayMessage("You connected with id: " + socketConnection.id);
      setSocket(socketConnection);
    });

    socketConnection.on("recieve_message", (message) => {
      displayMessage(message, "senders");
    });
    setUsername(prompt("Enter Username: "));
  }, []);

  return (
    <Box className="App">
      <div className="msg_box"></div>
      <form id="message_form" onSubmit={(e) => sendMessage(e, socket)}>
        <input type="text" placeholder="Message" ref={msg_input} />
        <button type="submit">Send</button>
      </form>
      <form id="room_form" onSubmit={(e) => joinRoom(e, room_input, socket)}>
        <input type="text" placeholder="Room" ref={room_input} />
        <button type="submit">Join</button>
      </form>
    </Box>
  );
}

const Box = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

  .msg_box {
    border: 1px solid black;
    height: 500px;
    width: 400px;
    border-radius: 5px;
    overflow-y: auto;

    div {
      padding: 10px;
      font-weight: bold;
    }

    .mine {
      background-color: royalblue;
    }
    .senders {
      background-color: tomato;
    }
  }

  #room_form,
  #message_form {
    width: 400px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 10px 0;

    input {
      width: 300px;
      padding: 10px;
    }
    button {
      padding: 10px;
    }
  }
`;

function displayMessage(message, sender) {
  const msg_box = document.querySelector(".msg_box");

  let elm = document.createElement("div");
  elm.innerText = message;
  elm.className = sender;
  msg_box.appendChild(elm);
}

function joinRoom(e, room, socket) {
  e.preventDefault();
  const id = room.current.value;
  socket.emit("join-room", id, (message) => {
    displayMessage(message);
  });
}

export default Works;
