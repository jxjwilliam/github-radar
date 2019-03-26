import React, {
  Component
} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import {
  Footer,
  Navigator
} from './components'
import Header from './containers/Header'
import Repos, {
  Repository,
  Commit,
  Topic,
  Views,
  Hot,
  Latest,
  Tags,
  Channel9,
  Others
} from './containers'
import {GithubCategories, StackoverflowCategories, MsdnCategories} from './config'
import './App.css';

const About = () => <h1>About</h1>

const routes = [{
  path: "/",
  exact: true,
  component: Repos.Github
}, {
  path: "/github",
  component: Repos.Github,
  routes: [{
    path: GithubCategories[0][1],
    Component: Repository
  }, {
    path: GithubCategories[1][1],
    Component: Topic
  }, {
    path: GithubCategories[2][1],
    Component: Commit
  }
]
}, {
  path: "/stackoverflow",
  component: Repos.Stackoverflow,
  routes: [{
    path: StackoverflowCategories[0][1],
    Component: Views
  }, {
    path: StackoverflowCategories[1][1],
    Component: Hot
  }, {
    path: StackoverflowCategories[2][1],
    Component: Latest
  }, {
    path: StackoverflowCategories[3][1],
    Component: Tags
  }]
}, {
  path: "/msdn",
  component: Repos.Msdn,
  routes: [{
    path: MsdnCategories[0][1],
    Component: Channel9
  }, {
    path: MsdnCategories[0][1],
    Component: Others
  }]
}, {
  path: "/about",
  component: About
}, {
  path: "/*",
  component: Repos.Github
}]


function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}


class App extends Component {
  render() {
    return ( 
      <Router>
      <div className="App container">
        <Header title="GitHub" />
        <Navigator />
        <Switch> 
        {
          routes.map((route, i) => ( 
            <RouteWithSubRoutes key={i} {...route} />
          ))
        }
        </Switch>
        <Footer />
      </div>
      </Router>
    )
  }
}

export default App;