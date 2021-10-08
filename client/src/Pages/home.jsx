import { Page } from "../styles/homeStyles";

export default function Home() {
  return (
    <Page>
      <section>
        <i className="far fa-paper-plane"></i>
        <p>Join a Room and start Chatting!</p>
      </section>
      <div className="cards">
        <p>Featured Rooms</p>
        <div className="room_card">
          <i className="fas fa-users"></i>
          <div className="room_title">Rockers</div>
        </div>
        <div className="room_card">
          <i className="fas fa-users"></i>
          <div className="room_title">Full Stack Devs</div>
        </div>
        <div className="room_card">
          <i className="fas fa-plus"></i>
          <div className="room_title">Create your Own</div>
        </div>
      </div>
    </Page>
  );
}
