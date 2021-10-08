import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { Bar, SliderBox } from "../styles/sidebarStyles";
import { getAndSetUserData, logout } from "../helpers/userAuth";
import { useEffect } from "react";
import { toggleCardItem } from "../helpers/sidebarHandler";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.userProfile);
  const location = useLocation();
  const unwantedPaths = ["/login", "/register"];

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
              {/* __________________________________________ */}
              <h4>Previously Joined Rooms</h4>
              <Link to="/room/programmers">
                <div className="room_card">
                  <div className="icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <div className="room_title">Programmers</div>
                </div>
              </Link>
              <Link to="/room/Full Stack Devs">
                <div className="room_card">
                  <div className="icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <div className="room_title">Full Stack Devs</div>
                </div>
              </Link>
              <Link to="/room/rockers">
                <div className="room_card">
                  <div className="icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <div className="room_title">Rockers</div>
                </div>
              </Link>
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
