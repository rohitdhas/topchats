import { MsgBox, RoomNav } from "../styles/roomStyles";
import { sendMessage } from "../helpers/socketHandler";
import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { displayMessage } from "../helpers/socketHandler";
import { toggleEmojiKeyboard } from "../helpers/emojiHandler";

export default function Room() {
  const userInput = useRef("");
  const params = useParams();
  const [socket, setSocket] = useState();
  const { username } = useSelector((state) => state.userProfile);

  useEffect(() => {
    const roomId = params.roomID;
    let socketConnection = io("http://localhost:4000");

    socketConnection.on("connect", () => {
      setSocket(socketConnection);
    });

    socketConnection.on("recieve_message", (messageData) => {
      displayMessage(messageData, "sender");
    });

    socketConnection.emit("leave-all");
    socketConnection.emit("join-room", roomId);
  }, []);

  return (
    <>
      <RoomNav>
        <div className="room_title">{params.roomID}</div>
        <button>
          Manage Room
          <i className="fas fa-cog"></i>
        </button>
      </RoomNav>
      <MsgBox id="msg_container">
        <section id="messages"></section>
        <form
          onSubmit={(e) =>
            sendMessage(e, userInput, username, params.roomID, socket)
          }
        >
          <div onClick={(e) => toggleEmojiKeyboard(e)} className="emoji">
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
  );
}
