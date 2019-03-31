import Repos, {
  Repository, Commit, Topic, Views, Hot,
  Latest, Tags, Channel9, Others, About, Demo
} from './containers'

const Github = {
  'repository': Repository,
  'topic': Topic,
  'commit': Commit,
  'label': Label,
  'issue': Issue,
  'code': Code,
  'user': User
};

const Stackoverflow = {
  'views': Views,
  'hottest': Hot,
  'latest': Latest,
  'tags': Tags
};

const Msdn = {
  'blogs': Blogs,
  'channel9': Channel9,
  'others': Others
}

const Routes = {
  home: {
    path: "/",
    exact: true,
    component: Repos.Github
  },
  github: {
    path: "/github",
    component: Repos.Github,
  },
  sof: {
    path: "/stackoverflow",
    component: Repos.Stackoverflow,
  },
  msdn: {
    path: "/msdn",
    component: Repos.Msdn,
  },
  about: {
    path: "/about",
    component: Repos.About
  },
  contact: {
    path: "/contact",
    component: Repos.Contact
  },
  other: {
    path: "/*",
    component: Repos.Github
  }
}

let years = [];
let max_year = new Date().getFullYear(), min_year = max_year - 10;
for (let i = max_year; i > min_year; i--) {
  years.push(i)
}

// /github/2018, /github/2019
let GithubYears = component => years.map(year => ({
    path: '/github/' + year,
    component: component
  }
))

// /github/repository/:repository, /github/topic/:topic
let GithubCates = Object.keys(Github).map(key => ({
  path: '/github/' + key,
  component: Github[key]
}))