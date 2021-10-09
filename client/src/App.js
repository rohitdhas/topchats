import "./styles/App.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './Pages/login'
import Register from "./Pages/register";
import Home from './Pages/home';
import Sidebar from "./components/sidebar";
import Works from "./components/working_chat_app";
import Room from "./components/room";
import RoomCreationForm from "./Pages/roomCreationForm";
import RoomDashboard from "./components/roomDashboard";

function App() {

  return (
    <Router>
      <Sidebar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/works" component={Works} />
        <Route exact path="/room/:roomID" component={Room} />
        <Route exact path="/dashboard/:roomID" component={RoomDashboard} />
        <Route exact path="/create/room" component={RoomCreationForm} />
      </Switch>
    </Router>
  );
}


export default App;
