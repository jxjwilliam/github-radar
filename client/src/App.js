import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import {Footer, Navigator} from './components'
import Header from './containers/Header'
import Repository, {
  Repository,  Commit,  Topic,
  Views, Hot, Latest,
  Tags, Channel9, Others
}  from './containers'
import './App.css';

const routes = [{
  path: "/",
  exact: true,
  component: Repository.Github
}, {
  path: "/github",
  component: Repository.Github,
  routes: [ {
    path: "/github/repository",
    Component: Repository
  }, {
    path: "/github/topics",
    Component: Topic
  }, {
    path: "/github/commits",
    Component: Commit
  }
  ]
}, {
  path: "/stackoverflow",
  component: Repository.Stackoverflow,
  routes: [ {
    path: "/stackoverflow/views",
    Component: Views
  }, {
    path: "/stackoverflow/hot",
    Component: Hot
  }, {
    path: "/stackoverflow/latest",
    Component: Latest
  }, {
    path: "/stackoverflow/tags",
    Component: Tags
  }
] 
}, {
  path: "/msdn",
  component: Repository.Msdn,
  routes: [ {
    path: "/msdn/channel9",
    Component: Channel9
  }, {
    path: "/msdn/others",
    Component: Others
  }
]
}, {
  path: "/about",
  render: (props) => <h1>About</h1>
}, {
  render: ({match}) => <Redirect to="/"></Redirect>
}]


const RouteWithSubRoutes = route => (
  <Route path={route.path} render={props => (
    <route.component {...props} routes={route.routes} />
  )}
  />
)


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App container">
          <Header title="GitHub"/>
          <Navigator />
          <Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
          <Footer/>
        </div>
      </Router>
    )
  }
}

export default App;
