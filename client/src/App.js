import "./styles/App.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/login'
import Register from "./components/register";
import Home from "./components/home";
import Sidebar from "./components/sidebar";
import Works from "./components/working_chat_app";
import Room from "./components/room";

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
      </Switch>
    </Router>
  );
}


export default App;
