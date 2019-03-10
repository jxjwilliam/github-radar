import orderBy from 'lodash/orderBy'

const totalReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_TOTAL':
      return action.payload;
    case 'FETCH_TOTAL_FAIL':
      return action.error
    default:
      return state;
  }
}

const userListReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_USERS':
    case 'LOAD_USERS':
    case 'PREV_USERS':
    case 'NEXT_USERS':
      return action.payload;
    case 'FETCH_USERS_FAIL':
    case 'LOAD_USERS_FAIL':
    case 'PREV_USERS_FAIL':
    case 'NEXT_USERS_FAIL':
      return action.error;
    case 'SORT_USERS':
      return orderBy(state, [action.sortBy], [action.seq]);
    case 'SEARCH_USERS':
      if (Array.isArray(action.payload.items)) {
        return action.payload.items.reduce((arr, item) => {
          arr.push({
            'created': item['created_at'],
            'updated': item['updated_at'],
            'name': item['name'],
            'forks': item['forks'],
            'stars': item['stargazers_count'],
            'size': item['size']
          });
          return arr;
        }, []);
      }
      return action.payload;
    case 'SEARCH_USERS_FAIL':
      return action.error;
    default:
      return state;
  }
}

// fix bugs for 'team' array: forth and back search works.
const searchFields = (state, field, keyword) => {
  if ('team' === field.toLowerCase()) {
    let teams = JSON.parse(JSON.stringify(state));
    teams.forEach(t => {
      let s = t.team.filter(st => {
        return st.toLowerCase().indexOf(keyword) !== -1
      })
      t.team = s;
    })
    return teams.filter(t => t.team.length > 0);
  }
  return state.filter(ul => ul[field] && ul[field].toLowerCase().indexOf(keyword) !== -1)
}

export {
  totalReducer,
  userListReducer,
  searchFields
}