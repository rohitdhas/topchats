import { LoginForm } from "../styles/loginFormStyles";
import { createRoom } from "../helpers/roomHandler";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { toggleSidebar } from "../helpers/sidebarHandler";

export default function RoomCreationForm() {
  const userInput = useRef("");
  const errResponse = useRef("");
  const { userId } = useSelector((state) => state.userProfile);

  return (
    <LoginForm>
      <form
        onSubmit={(e) =>
          createRoom(e, userInput.current.value, userId, errResponse)
        }
      >
        <div className="sidebar_bar" onClick={toggleSidebar}>
          <i className="fab fa-facebook-messenger"></i>
        </div>
        <div className="err_msg" ref={errResponse}></div>
        <div>
          <label>Room Name</label>
          <input
            type="text"
            placeholder="Enter name for your room!"
            ref={userInput}
          />
        </div>
        <button type="submit">Create Room</button>
      </form>
    </LoginForm>
  );
}
