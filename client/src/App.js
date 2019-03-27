import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import {routes} from './config'
import {Footer, Navigator} from './components'
import Header from './containers/Header'
import './App.css';

const UserLoginRouters = ({routes}) => {
  const rs = routes.map(r => {
    let {routes, ...o} = r;
    return <Route path={o.path} component={o.component} key={o.component} {...o} />
  })
  return (
    <Switch>
      {rs}
    </Switch>
  )
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App container">
          <Header title="GitHub"/>
          <Navigator />
          <UserLoginRouters routes={routes}/>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;