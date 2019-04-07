import Repos from './containers';
import github from './components/github';
import sof from './components/stackoverflow'
import msdn from './components/msdn'
import About from './components/About'
import Contact from './components/Contact'

// this part is better to be dynamically acquired.
export const Category = {
  'github': [
    ['Repositories', 'repository'],
    ['Topics', 'topics'],
    ['Commits', 'commits'],
    ['Labels', 'labels'],
    ['Issues', 'issues'],
    ['Code', 'code'],
    ['Users', 'users'],
    ['Text match metadata', 'tmm']
  ],
  'stackoverflow': [
    ['Views', "/stackoverflow/views"],
    ['Hottest', "/stackoverflow/hot"],
    ['Latest', "/stackoverflow/latest"],
    ['Tags', "/stackoverflow/tags"],
  ],
  'msdn': [
    ['Blogs', '/msdn/blogs'],
    ['Channel9', "/msdn/channel9"],
    ['Others', "/msdn/others"]
  ]
}

export const routes = [
  {
    path: "/",
    exact: true,
    component: Repos.Github
  },
  {
    path: "/github",
    component: Repos.Github
  },
  {
    path: "/stackoverflow",
    component: Repos.Stackoverflow
  },
  {
    path: "/msdn",
    component: Repos.Msdn
  }, {
    path: "/about",
    component: About
  }, {
    path: "/contact",
    component: Contact
  }, {
    path: "/*",
    component: Repos.Github
  }
]

export const getSubRoutes = (category) => {
  return routes[category]['routes']
}