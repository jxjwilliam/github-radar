```
data['issues_url'],
data['deployments_url'],
data['stargazers_count'],
data['forks_url'],
data['mirror_url'],
data['subscription_url'],
data['notifications_url'],
data['collaborators_url'],
data['watchers'],
data['name'],
data['language'],
data['url'],
data['created_at'],
data['pushed_at'],
data['forks_count'],
data['default_branch'],
data['teams_url'],
data['trees_url'],
data['branches_url'],
data['subscribers_url'],
data['stargazers_url']


data[items].reduce((arr, item) => {
  arr.push({
	'created': item['created_at'],
	'updated': item['updated_at'],
	'name': item['name'],
	'forks': item['forks'],
	'stars': item['stargazers_count'],
	'size': item['size']
  })
  return arr;
}, []);
```

```javascript

const resources = [
  {
    'rate_limit': "https://api.github.com/rate_limit",
    'search': "https://api.github.com/search/repositories?q=language:python&sort=stars",
  }
]
```