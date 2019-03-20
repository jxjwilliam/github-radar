import orderBy from 'lodash/orderBy'

const githubReducer = (state = [], action) => {
  switch (action.type) {
    case 'SORT_GITHUB':
      return orderBy(state, [action.sortBy], [action.seq]);
    case 'SEARCH_GITHUB':
      if (Array.isArray(action.payload.items)) {
        return action.payload.items.reduce((arr, item) => {
          arr.push({
            'name': item['name'],
            'fname': item['full_name'],
            'forks': item['forks'],
            'stars': item['stargazers_count'],
            'size': item['size'],
            'url': item['html_url'],
            'desc': item['description'],
            'created': item['created_at'],
            'updated': item['updated_at'],
            'watchers': item['watchers'],
            'issues': item['open_issues'],
            'language': item['language']
          });
          return arr;
        }, []);
      }
      return action.payload;
    case 'SEARCH_GITHUB_FAIL':
      return action.error;
    default:
      return state;
  }
}


export default githubReducer;