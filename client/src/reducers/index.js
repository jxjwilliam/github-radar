import {combineReducers} from 'redux'
import orderBy from 'lodash/orderBy'

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
    case 'SEARCH_USERS_FAIL':
      return action.error;
    default:
      return state;
  }
}

export const searchFields = (state, field, keyword) => {
  return state.filter(ul => ul[field] && ul[field].toLowerCase().indexOf(keyword) !== -1)
}

export default combineReducers({
  userList: userListReducer
})