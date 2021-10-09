import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { Bar, SliderBox } from "../styles/sidebarStyles";
import { getAndSetUserData, logout } from "../helpers/userAuth";
import { useEffect } from "react";
import { Link } from "react-router-dom";
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
      <Bar>
        {!username ? (
          <div className="sidebar_user_section">
            <span>Hey User!</span>
            <Slider />
            <button onClick={() => (window.location = "/login")}>Log In</button>
          </div>
        ) : (
          <>
            <div className="sidebar_user_section">
              <span>Hey {username}!</span>
              <Slider />
              <button onClick={logout}>Sign Out</button>
            </div>
            {/* _________________________________________ */}
            <div className="room_list">
              <h4>Your Rooms</h4>
              <div className="room_card">
                <div className="icon plus">
                  <i className="fas fa-plus"></i>
                </div>
                <div className="room_title">Create New</div>
              </div>
              {!userRooms.length
                ? null
                : userRooms.map((room) => {
                    if (room.admin === userId) {
                      return <RoomCard roomData={room} />;
                    }
                  })}
              {/* __________________________________________ */}
              <h4>Previously Joined Rooms</h4>
              {!userRooms.length
                ? null
                : userRooms.map((room) => {
                    if (room.users.includes(userId)) {
                      return <RoomCard roomData={room} />;
                    }
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
    <Link to={`/room/${roomData._id}`}>
      <div className="room_card">
        <div className="icon">
          <i className="fas fa-users"></i>
        </div>
        <div className="room_title">{roomData.name}</div>
      </div>
    </Link>
  );
}
