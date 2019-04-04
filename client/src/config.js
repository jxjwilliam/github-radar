import Repos, {
  Repository, Commit, Topic, Views, Hot,
  Latest, Tags, Channel9, Others, About, Demo
} from './containers'

// this part is better to be dynamically acquired.
export const Languages = [
  ["JavaScript", "javascript"],
  ["C", "c"],
  ["C++", "cplusplus"],
  ["C#", "csharp"],
  ["Python", "python"],
  ["Java", "java"],
  ["Visual Basic .NET", "vb.net"],
  ["SQL", "sql"],
  ["R", "r language"],
  ["Ruby", "ruby"],
  ["Objective-C", "objective-c"],
  ["Visual Basic", "vb"],
  ["Perl", "perl"],
  ["Swift", "swift"],
  ["Assembly Language", "assembly language"],
  ["MATLAB", "matlab"],
  ["Go", "go"],
  ["Delphi/Object Pascal", "delphi"],
  ["PL/SQL", "plsql"],
  ["Lisp", "lisp"],
  ["Ada", "ada"],
  ["Go", "go"],
  ["GoLang", "golang"],
  ["Scala", "scala"],
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
  ['Blogs', '/msdn/blogs'],
  ['Channel9', "/msdn/channel9"],
  ['Others', "/msdn/others"]
]

export const routes = [
  {
    path: "/",
    exact: true,
    component: Repos.Github
  },
  {
    path: "/github",
    component: Repos.Github,
    routes: [
      {
      path: GithubCategories[0][1],
      component: Repository
    }, {
      path: GithubCategories[1][1],
      component: Topic
    }, {
      path: GithubCategories[2][1],
      component: Commit
    }, {
        path: '/github/2010',
        component: Demo
      }, {
      path: '/github/2011',
      component: Demo
    }, {
      path: '/github/2012',
      component: Demo
    }, {
      //path: '/github/abc/efg/2013',
        path: '/github/2013',
      component: Demo
    }, {
      path: '/github/2014',
      component: Demo
    }, {
      path: '/github/2015',
      component: Demo
    }, {
      path: '/github/2016',
      component: Demo
    }, {
      path: '/github/2017',
      component: Demo
    }, {
      path: '/github/2018',
      component: Demo
    }, {
      path: '/github/2019',
      component: Demo
    }
    ]
  },
  {
    path: "/stackoverflow",
    component: Repos.Stackoverflow,
    routes: [
      {
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
    }, , {
      path: '/stackoverflow/2011',
      component: Demo
    }, {
      path: '/stackoverflow/2012',
      component: Demo
    }, {
      path: '/stackoverflow/abc/efg/2013',
      component: Demo
    }, {
      path: '/stackoverflow/2014',
      component: Demo
    }, {
      path: '2015',
      component: Demo
    }
    ]
  },
  {
    path: "/msdn",
    component: Repos.Msdn,
    routes: [
      {
      path: MsdnCategories[0][1],
      component: Channel9
    }, {
      path: MsdnCategories[0][1],
      component: Others
    }, {
      path: '/msdn/2011',
      component: Demo
    }, {
      path: '/msdn/2012',
      component: Demo
    }
    ]
  },
  {
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

export const Industries = [
  'Financial Services',  //23%
  'Travel & Consumer',  // 21%
  'Software & Hi-Tech', // 19%
  'Business & Information Services', //18%
  'Emerging', // 10%
  'Life Siences & Healthcare',  //9%
];

export const Region = [
  'USA',
  'Belarus & Russia & Ukrine',
  'East Europe',
  'East Asia',
  'India',
  'Others'
];

export const Recommendation = [];

export const Forcast = [];
