import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {RootRouters} from './Routers'
import Header from './containers/Header'
import {Navigator, Footer} from './components'
import './App.css';
import Github from './containers/Github'
import About from './components/About'

const TrendsRouters = props => {
  const {routes} = props;
  const rs = routes.map((r, i) => (
    <Route path={r.path} component={r.component} key={`${r.path.substr(1)}_${i}`}/>
  ));

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
          <Header title="Trends and Prediction"/>
          <Navigator />
          <TrendsRouters routes={RootRouters}/>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;