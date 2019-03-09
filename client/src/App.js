import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import {Header, Footer, Navigator} from './components'
import GHR  from './containers'
import './App.css';

const UserLoginRouters = () => (
  <Switch>
    <Route exact path="/" component={GHR.List}/>
    <Route path="/list" component={GHR.List}/>
    <Route path="/users/:email" exact strict component={GHR.Users}/>
    <Route render={({match}) => <Redirect to="/"/>}/>
  </Switch>
)

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App container">
          <Header/>
          <Navigator />
          <UserLoginRouters/>
          <Footer/>
        </div>
      </Router>
    )
  }
}

export default App;
