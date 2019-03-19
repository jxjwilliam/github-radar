import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import {Footer, Navigator} from './components'
import Header from './containers/Header'
import Repository  from './containers'
import './App.css';

const UserLoginRouters = () => (
  <Switch>
    <Route exact path="/" component={Repository.Github}/>
    <Route path="/github" component={Repository.Github}/>
    <Route path="/stackoverflow" component={Repository.Stackoverflow}/>
    <Route path="/msdn" component={Repository.Msdn}/>
    <Route path="/about" render={(props) => <h1>About</h1>}/>
    <Route path="/contact" render={(props) => <h1>Contact</h1>}/>
    <Route render={({match}) => <Redirect to="/"/>}/>
  </Switch>
)

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App container">
          <Header title="GitHub"/>
          <Navigator />
          <UserLoginRouters/>
          <Footer/>
        </div>
      </Router>
    )
  }
}

export default App;
