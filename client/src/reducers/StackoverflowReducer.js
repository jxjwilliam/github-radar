import orderBy from 'lodash/orderBy'

const stackoverflowReducer = (state = [], action) => {
  switch (action.type) {
    case 'SORT_SOF':
      return orderBy(state, [action.sortBy], [action.seq]);
    case 'SEARCH_SOF':
      if (Array.isArray(action.payload.items)) {
        return action.payload.items.reduce((arr, item) => {
          arr.push({
            'name': item['name'],
            'forks': item['forks'],
            'stars': item['stargazers_count'],
            'size': item['size'],
            'url': item['html_url'],
            'desc': item['description'],
            'created': item['created_at'],
            'updated': item['updated_at'],
          });
          return arr;
        }, []);
      }
      return action.payload;
    case 'SEARCH_SOF_FAIL':
      return action.error;
    default:
      return state;
  }
}

export default stackoverflowReducer