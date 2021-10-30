import { Dashboard } from "../styles/roomDashboardStyles";
import {
  deleteRoom,
  useRoomData,
  blockUser,
  unblockUser,
} from "../helpers/roomHandler";
import { useParams, useHistory } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function RoomDashboard() {
  const params = useParams();
  const history = useHistory();
  const { userId, username } = useSelector((state) => state.userProfile);
  const { roomData, fetchData, isLoading } = useRoomData();

  useEffect(() => {
    const id = params.roomID;
    if (id) {
      fetchData(id);
    }
  }, []);
  return (
    <Dashboard>
      {!roomData._id || isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <div className="dashboard_nav">
            <div>
              <div className="back_btn" onClick={() => history.goBack()}>
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
            <li key="admin">
              <div>
                <i className="fas fa-user"></i>
                {roomData.admin.username} - <b>Admin</b>
              </div>
            </li>
            {roomData.users.map((user) => {
              let blocked = false;
              roomData.blockedUsers.forEach((blockedUser) => {
                if (blockedUser._id === user._id) {
                  blocked = true;
                }
              });

              if (!blocked)
                return (
                  <li key={user._id}>
                    <span>
                      <i className="fas fa-user"></i>
                      {user.username === username
                        ? `${user.username} (You)`
                        : user.username}
                    </span>
                    {userId === roomData.admin._id ? (
                      <button
                        onClick={() =>
                          blockUser(params.roomID, user._id, fetchData)
                        }
                      >
                        <i className="fas fa-ban"></i>
                        Block User
                      </button>
                    ) : null}
                  </li>
                );
            })}
            <div className="blocked_users">
              <h3>Blocked Users ({roomData.blockedUsers.length})</h3>
              {roomData.blockedUsers.map((user) => {
                console.log(user);
                return (
                  <li key={user._id}>
                    <span>
                      <i className="fas fa-user"></i>
                      {user.username}
                    </span>
                    {userId === roomData.admin._id ? (
                      <button
                        onClick={() =>
                          unblockUser(params.roomID, user._id, fetchData)
                        }
                      >
                        <i className="fas fa-ban"></i>
                        Unblock User
                      </button>
                    ) : null}
                  </li>
                );
              })}
            </div>
          </ul>
        </>
      )}
    </Dashboard>
  );
}