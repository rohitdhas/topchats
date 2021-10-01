import "./styles/App.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/login'
import Register from "./components/register";
import Home from "./components/home";

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </Router>
  );
}


export default App;
