import { Dashboard } from "../styles/roomDashboardStyles";
import { getRoomData, deleteRoom } from "../helpers/roomHandler";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

export default function RoomDashboard() {
  const params = useParams();
  const { userId } = useSelector((state) => state.userProfile);
  const [roomData, setRoomData] = useState({});

  useEffect(() => {
    const id = params.roomID;
    if (id) {
      getRoomData(id, setRoomData);
    }
  }, []);
  return (
    <Dashboard>
      {!roomData._id ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <div className="dashboard_nav">
            <div>
              <div className="back_btn" onClick={() => window.history.back()}>
                <i className="fas fa-chevron-circle-left"></i>
              </div>
              <div className="title">{roomData.name} Dashboard</div>
            </div>
            {userId === roomData.admin._id ? (
              <button onClick={() => deleteRoom(params.roomID)}>
                Delete Room
              </button>
            ) : null}
          </div>
          <ul className="users_list">
            <span>Room Users ({roomData.users.length})</span>
            <li>
              <i className="fas fa-user"></i>
              <div>
                {roomData.admin.username} - <b>Admin</b>
              </div>
            </li>
            {roomData.users.map((user) => {
              return (
                <li key={user._id}>
                  <i className="fas fa-user"></i>
                  {user.username}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </Dashboard>
  );
}
