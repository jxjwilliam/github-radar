import Repos, {
  Repository, Commit, Topic, Views, Hot,
  Latest, Tags, Channel9, Others, About
} from './containers'

// this part is better to be dynamically acquired.
export const Languages = [
  "JavaScript",
  "React",
  "Angular",
  "Vue",
  "Python",
  "Java",
  "Springboot",
  "Microservices",
  "Kotlin",
  "Scalar",
  "C++",
  "C#",
  ".NET",
  "PHP",
  "SQL",
  "R",
  "Ruby",
  "Objective-C",
  "Swift",
  "Lisp",
  "Perl",
  "Go",
  "MATLAB",
];

export const GithubCategories = [
  ['Repositories', '/github/repository'],
  ['Topics', '/github/topics'],
  ['Commits', '/github/commits'],
  ['Labels', '/github/labels'],
  ['Issues', '/github/issues'],
  ['Code', '/github/code'],
  ['Users', '/github/users'],
  ['Text match metadata', '/github/tmm'],
];

export const StackoverflowCategories = [
  ['Views', "/stackoverflow/views"],
  ['Hottest', "/stackoverflow/hot"],
  ['Latest', "/stackoverflow/latest"],
  ['Tags', "/stackoverflow/tags"],
]

export const MsdnCategories = [
  ['Channel9', "/msdn/channel9"],
  ['Others', "/msdn/others"]
]

export const routes = [
  {
    path: "/",
    exact: true,
    component: Repos.Github
  }, {
    path: "/github",
    component: Repos.Github,
    routes: [{
      path: GithubCategories[0][1],
      component: Repository
    }, {
      path: GithubCategories[1][1],
      component: Topic
    }, {
      path: GithubCategories[2][1],
      component: Commit
    }
    ]
  }, {
    path: "/stackoverflow",
    component: Repos.Stackoverflow,
    routes: [{
      path: StackoverflowCategories[0][1],
      component: Views
    }, {
      path: StackoverflowCategories[1][1],
      component: Hot
    }, {
      path: StackoverflowCategories[2][1],
      component: Latest
    }, {
      path: StackoverflowCategories[3][1],
      component: Tags
    }
    ]
  }, {
    path: "/msdn",
    component: Repos.Msdn,
    routes: [{
      path: MsdnCategories[0][1],
      component: Channel9
    }, {
      path: MsdnCategories[0][1],
      component: Others
    }
    ]
  }, {
    path: "/about",
    component: About
  }, {
    path: "/*",
    component: Repos.Github
  }
]

export const getSubRoutes = (category) => {
  return routes[category]['routes']
}

export const Years = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'];

export const Industries = [];

export const Region = [];

export const Recommendation = [];

export const Forcast = [];