import { MsgBox, RoomNav } from "../styles/roomStyles";
import { sendMessage } from "../helpers/socketHandler";
import { useRef, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { displayMessage, leaveRoom } from "../helpers/socketHandler";
import { toggleEmojiKeyboard } from "../helpers/emojiHandler";
import { addToRoom } from "../helpers/roomHandler";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import Login from "../Pages/login";
import { toggleSidebar } from "../helpers/sidebarHandler";

export default function Room() {
  const userInput = useRef("");
  const params = useParams();
  const [socket, setSocket] = useState();
  const { username, userId } = useSelector((state) => state.userProfile);
  const [roomData, setRoomData] = useState({});
  const location = useLocation();

  useEffect(() => {
    let socketConnection = io("http://localhost:4000");
    socketConnection.on("connect", () => {
      setSocket(socketConnection);
    });

    socketConnection.on("recieve_message", (messageData) => {
      displayMessage(messageData, "recieved");
    });

    socketConnection.on("room_data", (roomData) => {
      setRoomData(roomData);
      addToRoom(roomData.name, roomData.admin);
    });

    socketConnection.on("Bot", (msgData) => {
      displayMessage(
        { message: msgData.message, sender: { username: "Bot" } },
        "bot"
      );
    });
  }, []);

  useEffect(() => {
    const roomId = params.roomID;
    if (socket) {
      socket.emit("leave-all");
      socket.emit("join-room", roomId, userId);
    }
  }, [socket, location.pathname]);

  useEffect(() => {
    const chats = roomData.chats;
    const msg_box = document.getElementById("messages");

    if (chats && msg_box) {
      msg_box.innerHTML = "";
      chats.forEach((chat) => {
        if (chat.sender.username === username) {
          displayMessage(chat, "sent");
        } else {
          displayMessage(chat, "recieved");
        }
      });
    }
  }, [roomData]);

  return (
    <>
      {!username ? (
        <Login />
      ) : (
        <>
          {!roomData._id ? (
            <div id="loading_msg">Connecting...</div>
          ) : (
            <>
              <RoomNav>
                <div className="sidebar_bar" onClick={toggleSidebar}>
                  <i className="fab fa-facebook-messenger"></i>
                </div>
                <div className="room_title">
                  {roomData && roomData.name} -{" "}
                  <a href={`/dashboard/${roomData._id}`}>Dashboard</a>{" "}
                </div>
                <button
                  onClick={() => leaveRoom(params.roomID, username, socket)}
                >
                  Leave Room
                </button>
              </RoomNav>
              <MsgBox id="msg_container">
                <section id="messages"></section>
                <form
                  onSubmit={(e) =>
                    sendMessage(
                      e,
                      {
                        messageInput: userInput,
                        sender: { id: userId, username },
                        roomId: params.roomID,
                      },
                      socket
                    )
                  }
                >
                  <div
                    onClick={(e) => toggleEmojiKeyboard(e)}
                    className="emoji"
                  >
                    <i className="far fa-laugh-beam"></i>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your message here"
                    ref={userInput}
                    id="message_input"
                  />
                  <button type="submit">
                    Send
                    <i className="far fa-paper-plane"></i>
                  </button>
                </form>
              </MsgBox>
            </>
          )}
        </>
      )}
    </>
  );
}
