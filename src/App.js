import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <h1>Home Page</h1>
        </Route>
        <Route path="/about" exact>
          <h1>About Page</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
