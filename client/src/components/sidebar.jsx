import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { Bar, SliderBox } from "../styles/sidebarStyles";
import { getAndSetUserData, logout } from "../helpers/userAuth";
import { useEffect } from "react";
import { GetUserRooms } from "../helpers/sidebarHandler";

export default function Sidebar() {
  const dispatch = useDispatch();
  const { username, userId } = useSelector((state) => state.userProfile);
  const location = useLocation();
  const unwantedPaths = ["/login", "/register"];
  const { userRooms } = GetUserRooms();

  useEffect(() => {
    getAndSetUserData(dispatch);
  }, []);

  if (unwantedPaths.includes(location.pathname)) return <></>;
  else
    return (
      <Bar id="sidebar">
        <div className="site_logo">
          <a href="/">
            <i className="fab fa-facebook-messenger"></i>
            <span>top Chats</span>
          </a>
        </div>
        {!username ? (
          <div className="sidebar_user_section">
            <span>Hey User!</span>
            <button onClick={() => (window.location = "/login")}>Log In</button>
          </div>
        ) : (
          <>
            <div className="sidebar_user_section">
              <span>Hey {username}!</span>
              <button onClick={logout}>Sign Out</button>
            </div>
            {/* _________________________________________ */}
            <div className="room_list">
              <h4>Your Rooms</h4>
              <a href="/create/room">
                <div className="room_card">
                  <div className="icon plus">
                    <i className="fas fa-plus"></i>
                  </div>
                  <div className="room_title">Create New</div>
                </div>
              </a>
              {!userRooms.length
                ? null
                : userRooms.map((room) => {
                    if (room.admin === userId) {
                      return <RoomCard key={room._id} roomData={room} />;
                    } else return null;
                  })}
              {/* __________________________________________ */}
              <h4>Previously Joined Rooms</h4>
              {!userRooms.length
                ? null
                : userRooms.map((room) => {
                    if (room.users.includes(userId)) {
                      return <RoomCard key={room._id} roomData={room} />;
                    } else return null;
                  })}
            </div>
          </>
        )}
      </Bar>
    );
}

function Slider() {
  return (
    <SliderBox>
      <span className="label_text">Dark Mode -</span>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider round"></span>
      </label>
    </SliderBox>
  );
}

function RoomCard({ roomData }) {
  return (
    <a href={`/room/${roomData._id}`}>
      <div className="room_card">
        <div className="icon">
          <i className="fas fa-users"></i>
        </div>
        <div className="room_title">{roomData.name}</div>
      </div>
    </a>
  );
}
