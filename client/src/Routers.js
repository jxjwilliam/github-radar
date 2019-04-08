import Repos from './containers'
import github from './components/github'
import sof from './components/stackoverflow'
import msdn from './components/msdn'
import About from './components/About'
import Contact from './components/Contact'

export const GithubItems = {
  'repository': github.Repository,
  'topic': github.Topic,
  'commit': github.Commit,
  'label': github.Label,
  'issue': github.Issue,
  'code': github.Code,
  'user': github.User
};

export const StackoverflowItems = {
  'views': sof.Views,
  'hottest': sof.Hot,
  'latest': sof.Latest,
  'tags': sof.Tags
};

export const MsdnItems = {
  'blogs': msdn.Blogs,
  'channel9': msdn.Channel9,
  'others': msdn.Others
}

export const RootRouters = [
  {
    path: '/',
    exact: true,
    component: Repos.Github
  }, {
    path: '/github',
    component: Repos.Github
  }, {
    path: '/stackoverflow',
    component: Repos.Stackoverflow
  }, {
    path: '/msdn',
    component: Repos.Msdn
  }, {
    path: '/about',
    component: About
  }, {
    path: '/contact',
    component: Contact
  }, {
    path: '/*',
    component: Repos.Github
  }
]

// /github/2018, /github/2019
// let GithubYears = component => years.map(year => ({
//     path: '/github/' + year,
//     component: component
//   }
// ))
//
// // /github/repository/:repository, /github/topic/:topic
// let GithubCates = Object.keys(Github).map(key => ({
//   path: '/github/' + key,
//   component: Github[key]
// }))