import { Page } from "../styles/homeStyles";
import { Link } from "react-router-dom";
import { toggleSidebar } from "../helpers/sidebarHandler";

export default function Home() {
  return (
    <Page>
      <div className="sidebar_bar" onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </div>
      <section>
        <i className="far fa-paper-plane"></i>
        <p>Join a Room and start Chatting!</p>
      </section>
      <div className="cards">
        <p>Featured Rooms</p>
        <Link to={"/room/6161c32f0854e5b501af1cce"}>
          <div className="room_card">
            <i className="fas fa-users"></i>
            <div className="room_title">Programmers</div>
          </div>
        </Link>
        <Link to={"/room/6161d9865057229a316569a1"}>
          <div className="room_card">
            <i className="fas fa-users"></i>
            <div className="room_title">Full Stack Devs</div>
          </div>
        </Link>
        <Link to={"/create/room"}>
          <div className="room_card">
            <i className="fas fa-plus"></i>
            <div className="room_title">Create your Own</div>
          </div>
        </Link>
      </div>
    </Page>
  );
}
