import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Header, Footer, Navigator } from './components';
import List from './containers';
import './App.css';

const UserLoginRouters = () => (
    <Switch>
        <Route exact path="/" component={ List }/>
        <Route path="/about" render={ (props) => <h1>About</h1> }/>
        <Route path="/contact" render={ () => <h1>Contact</h1> }/>
        <Route render={ ({ match }) => <Redirect to="/"/> }/>
    </Switch>
);

class App extends Component {
  render () {
    return (
        <Router>
            <div className="App container">
                <Header/>
                <Navigator />
                <UserLoginRouters/>
                <Footer/>
            </div>
        </Router>
    );
  }
}

export default App;
