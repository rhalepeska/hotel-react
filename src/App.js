import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Account from './pages/Account/Account';
import Home from './pages/Home/Home';
import Hotels from './pages/Hotels/Hotels';
import Reservation from './pages/Reservation/Reservation';
import './App.css';
import Footer from './components/Footer';

const App = () => {
  
  return (
    <Router>
      <Nav/>
        <Switch>
            <Route path="/" exact>
                <Home/>
            </Route>
            <Route path="/account" exact>
              <Account />
            </Route>
            <Route path="/hotels" exact>
                <Hotels/>
            </Route>
            <Route path="/reserve/:id" component={Reservation}/>
        </Switch>
        <Footer/>
      </Router>
  );
}

export default App;
