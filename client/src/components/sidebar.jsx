import { useSelector, useDispatch } from "react-redux";
import { getAndSetUserData, logout } from "../helpers/userAuth";
import { GetUserRooms, toggleSidebar } from "../helpers/sidebarHandler";
import { Bar } from "../styles/sidebarStyles";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useEffect } from "react";

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
          <Link onClick={toggleSidebar} to="/">
            <i className="fab fa-facebook-messenger"></i>
            <span>top Chats</span>
          </Link>
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
              <Link onClick={toggleSidebar} to="/create/room">
                <div className="room_card">
                  <div className="icon plus">
                    <i className="fas fa-plus"></i>
                  </div>
                  <div className="room_title">Create New</div>
                </div>
              </Link>
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

function RoomCard({ roomData }) {
  return (
    <Link onClick={toggleSidebar} to={`/room/${roomData._id}`}>
      <div className="room_card">
        <div className="icon">
          <i className="fas fa-users"></i>
        </div>
        <div className="room_title">{roomData.name}</div>
      </div>
    </Link>
  );
}
